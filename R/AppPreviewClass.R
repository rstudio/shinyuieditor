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
    logger = NULL,
    ws = NULL,

    initialize = function(app_loc, port, host, show_preview_app_logs, logger = function() {}) {
      logger("=> Starting Shiny preview app...")

      self$logger <- logger
      self$app_loc <- app_loc
      self$port <- port
      self$host <- host
      self$url <- get_app_url(host = host, port = port)

      self$start_app()

      # self$on_log_poll <-  create_output_subscribers(
      #   source_fn = self$p$read_error_lines,
      #   filter_fn = function(lines) {
      #     length(lines) > 0
      #   }
      # )
      #
      if (show_preview_app_logs) {
        self$on_log(log_background_app)
      }

      self$on_crash_poll <- create_output_subscribers(
        source_fn = self$p$is_alive,
        filter_fn = function(alive) {
          !alive
        },
        delay = 1
      )

      failure_to_start_check <- self$on_crash(function(is_dead) {
        stop("Failed to start up shiny app. Check logs for more info:")
      })


      logger("=> ...Shiny app running in background")
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

      self$logger("Started Shiny preview app: ", crayon::red("App PID:", self$p$get_pid()))
    },

    stop = function() {
      self$logger("Stopping app preview process\n")

      tryCatch(
        {
          self$logger("=> Shutting down running shiny app...")
          # tools::SIGINT = 2
          # tools::SIGTERM = 15
          self$p$signal(15L)
        },
        error = function(e) {
          self$logger("Error shutting down background Shiny app:")
          print(e)
        }
      )
    },

    cleanup = function() {
      self$logger("Stopping listeners\n")
      self$on_log_poll$cancel_all()
      self$on_crash_poll$cancel_all()
      self$on_ready_poll$cancel_all()

      self$stop()
    },

    restart = function() {
      self$logger("Restarting app preview process\n")

      self$start_app()

      self$on_log_poll <- self$on_log_poll$update_subscribed(self$p$read_error_lines)
      self$on_crash_poll <<- self$on_crash_poll$update_subscribed(self$p$is_alive)

      Sys.sleep(1)
      self$logger("Restarted app preview, listening for ready and new crashes...\n")

      self$msg_when_ready()
      self$listen_for_crash()
    },
    connect_to_ws = function(ws) {
      self$ws <- ws

      self$msg_when_ready()
      self$msg_app_logs()
      self$listen_for_crash()
    },

    msg_when_ready = function() {

      listen_for_ready <- self$on_ready(function(app_ready) {
        self$ws$send(
          build_ws_message(
            "SHINY_READY",
            payload = self$url
          )
        )
      })
    },

    msg_app_logs = function() {
      self$on_log(function(log_lines) {
        self$ws$send(
          build_ws_message(
            "SHINY_LOGS",
            payload = log_lines
          )
        )
      })
    },

    listen_for_crash = function(id = 1) {
      on_crash <- self$on_crash(function(is_alive) {
        cat(crayon::bgCyan("Crash detected id=", id, "\n"))

        self$ws$send(
          build_ws_message(
            "SHINY_CRASH",
            payload = "uh-oh"
          )
        )
        on_crash()
      })
    },

    on_crash = function(callback) {
      self$on_crash_poll$subscribe(callback)
    },

    on_ready = function(callback) {

      self$on_ready_poll <- create_output_subscribers(
        source_fn = self$app_is_ready,
        filter_fn = function(is_ready) is_ready
      )

      app_is_ready_check <- self$on_ready_poll$subscribe(function(app_ready) {
        self$logger("~~~~App Ready~~~~~\n")
        # failure_to_start_check()

        # Once we get the ready signal, turn off the subscription
        app_is_ready_check()

        callback()
      })

      # self$on_ready_poll$subscribe(callback)
    },

    on_log = function(callback) {

      self$on_log_poll <- create_output_subscribers(
        source_fn = self$p$read_error_lines,
        filter_fn = function(lines) {
          length(lines) > 0
        }
      )

      self$on_log_poll$subscribe(callback)
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
