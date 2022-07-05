# Class to start up and manage the background process running the preview app
# shared with the shiny ui editor
AppPreview <- R6::R6Class(
  "AppPreview",
  public = list(
    p = NULL,
    app_loc = NULL,
    host = NULL,
    port = NULL,
    url = NULL,
    on_ready_poll = NULL,
    on_log_poll = NULL,
    on_crash_poll = NULL,
    show_preview_app_logs = NULL,
    logger = NULL,
    ws = NULL,
    initialize = function(app_loc, port, host, show_preview_app_logs, logger = function() {}) {
      logger("=> Starting Shiny preview app...")

      self$logger <- logger
      self$show_preview_app_logs <- show_preview_app_logs
      self$app_loc <- app_loc
      self$port <- port
      self$host <- host
      self$url <- get_app_url(host = host, port = port)

      self$start_app()
    },
    app_is_ready = function() {
      server_exists(self$url)
    },
    start_app = function() {
      self$p <- callr::r_bg(
        func = function(app_loc, host, port) {
          # Turn on live-reload and dev mode
          # shiny::devmode(TRUE)
          options(shiny.autoreload = TRUE)
          shiny::runApp(app_loc, port = port, host = host)
        },
        args = list(self$app_loc, self$host, self$port),
        supervise = TRUE # Extra security for process being cleaned up properly
      )

      self$subscribe_to_logs()

      self$logger("Started Shiny preview app - App PID:", self$p$get_pid())
    },
    stop_app = function() {
      self$logger("Stopping app preview process\n")

      self$stop_listeners()

      tryCatch(
        {
          self$logger("=> Shutting down running shiny app...")
          # tools::SIGTERM = 15
          self$p$signal(15L)
        },
        error = function(e) {
          self$logger("Error shutting down background Shiny app:")
          print(e)
        }
      )
    },
    restart = function() {
      self$logger("Restarting app preview process\n")
      self$stop_listeners()

      self$start_app()

      Sys.sleep(1)
      self$logger("Restarted app preview, listening for ready and new crashes...\n")

      self$start_listeners()
    },

    subscribe_to_logs = function() {
      self$on_log_poll <- create_output_subscribers(
        source_fn = self$p$read_error_lines,
        filter_fn = function(lines) {
          length(lines) > 0
        }
      )

      self$on_log_poll$subscribe(function(log_lines) {
        if (self$show_preview_app_logs) {
          log_background_app(log_lines)
        }

        if (!is.null(self$ws)) {
          self$ws$send(
            build_ws_message(
              "SHINY_LOGS",
              payload = log_lines
            )
          )
        }
      })
    },

    cleanup = function() {
      self$stop_app()
    },
    connect_to_ws = function(ws) {
      self$ws <- ws
      self$start_listeners()
    },

    start_listeners = function() {
      self$on_ready_poll <- subscribe_once(
        source_fn = self$app_is_ready,
        filter_fn = function(is_ready) is_ready,
        callback = function() {
          self$logger("~~~~App Ready~~~~~\n")
          # failure_to_start_check()

          self$ws$send(
            build_ws_message(
              "SHINY_READY",
              payload = self$url
            )
          )
        }
      )

      self$on_crash_poll <- subscribe_once(
        source_fn = self$p$is_alive,
        filter_fn = function(alive) !alive,
        delay = 1,
        callback = function() {
          cat(crayon::bgCyan("Crash detected \n"))

          self$ws$send(
            build_ws_message(
              "SHINY_CRASH",
              payload = "uh-oh"
            )
          )
        }
      )
    },
    stop_listeners = function() {
      self$on_log_poll$cancel_all()
      self$on_crash_poll$cancel_all()
      self$on_ready_poll$cancel_all()
    }
  )
)


server_exists <- function(url_id) {
  # Using a url object instead of the url as a string because readLines() with
  # url string will cause failed connections to stay open
  url_obj <- url(url_id)
  on.exit(
    {
      close(url_obj)
    },
    add = TRUE
  )

  ret <- !inherits(
    try(
      {
        suppressWarnings(readLines(url_obj, 1))
      },
      silent = TRUE
    ),
    "try-error"
  )
  ret
}

get_app_url <- function(host, port) {
  path_to_app <- if (host == "0.0.0.0") {
    # Don't use 0.0.0.0 directly as browsers don't give it a free pass for lack
    # of SSL like they do localhost and 127.0.0.1
    "127.0.0.1"
  } else {
    host
  }

  paste0("http://", path_to_app, ":", port)
}

log_background_app <- function(lines) {
  cat(
    paste0(
      crayon::bold$magenta("Logs from preview app:\n"),
      crayon::magenta(paste(lines, collapse = "\n")),
      "\n"
    )
  )
}
