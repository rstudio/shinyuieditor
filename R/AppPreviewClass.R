# Class to start up and manage the background process running the preview app
# shared with the shiny ui editor
AppPreview <- R6::R6Class(
  "AppPreview",
  private = list(
    p = NULL,
    is_running = FALSE,
    on_ready = NULL,
    on_logs = NULL,
    on_crash = NULL,
    on_ready_poll = NULL,
    on_log_poll = NULL,
    app_loc = NULL,
    print_logs = NULL,
    previous_logs = NULL,
    logger = NULL,
    on_crash_poll = NULL,
    start_listeners = function() {
      private$on_ready_poll <- subscribe_once(
        source_fn = function() {
          server_exists(self$url)
        },
        filter_fn = function(is_ready) is_ready,
        callback = function() {
          private$logger("~~~~App Ready~~~~~\n")
          if (!is.null(private$on_ready)) {
            private$on_ready()
          }
        }
      )

      private$on_crash_poll <- subscribe_once(
        source_fn = private$p$is_alive,
        filter_fn = function(alive) !alive,
        delay = 1,
        callback = function() {
          cat(crayon::bgCyan("Crash detected \n"))
          if (!is.null(private$on_crash)) {
            private$on_crash()
          }
        }
      )
    },
    stop_listeners = function() {
      private$on_log_poll$cancel_all()
      private$on_crash_poll$cancel_all()
      private$on_ready_poll$cancel_all()
    }
  ),
  public = list(
    host = NULL,
    port = NULL,
    url = NULL,
    initialize = function(
      app_loc, 
      port, 
      host, 
      print_logs, 
      logger = function() { } # nolint
    ) {
      private$logger <- logger
      private$print_logs <- print_logs
      private$app_loc <- app_loc
      self$port <- port
      self$host <- host
      # The location of the background app that is sent to the react app's
      # iframe for viewing
      self$url <- get_app_url(host = host, port = port)

    },
    start_app = function() {

      if (private$is_running) {
        # App is already running. No need to start up again
        return()
      }
      private$logger("=> Starting Shiny preview app...")
      private$p <- callr::r_bg(
        func = function(app_loc, host, port) {
          # Turn on live-reload
          options(shiny.autoreload = TRUE)

          # Start preview app in background
          shiny::runApp(app_loc, port = port, host = host)
        },
        args = list(private$app_loc, self$host, self$port),
        supervise = TRUE # Extra security for process being cleaned up properly
      )

      # Subscribe to the logs. Unlike the ready and crash listeners, this one is
      # always running in case it needs to print logs to the console
      private$on_log_poll <- create_output_subscribers(
        source_fn = private$p$read_error_lines,
        filter_fn = function(lines) {
          length(lines) > 0
        },
        callback = function(log_lines) {

          if (identical(private$previous_logs, log_lines)) {
            # Ommiting logs as they have not changed. Needed when errors occur
            # as they just look like an endless stream of the same error
            return()
          }
          if (private$print_logs) {
            log_background_app(log_lines)
          }

          if (!is.null(private$on_logs)) {
            private$on_logs(log_lines)
          }

          private$previous_logs <- log_lines
        }
      )

      private$logger("Started Shiny preview app - App PID:", private$p$get_pid())
      private$is_running <- TRUE
    },
    restart = function() {
      private$logger("Restarting app preview process\n")
      private$stop_listeners()

      private$start_app()

      # TODO: Send a message to the websocket that the app is restarting so
      # there's not an awkard 1s pause where the user thinks the app is frozen
      Sys.sleep(1)
      private$logger("Restarted app preview, listening for ready and new crashes...\n")
      private$start_listeners()
    },
    stop_app = function() {

      # If the app was never started, then we don't need to stop it 
      if (!private$is_running) return()

      private$logger("Stopping app preview process\n")

      private$stop_listeners()

      tryCatch(
        {
          private$logger("=> Shutting down running shiny app...")
          # tools::SIGTERM = 15
          private$p$signal(15L)
        },
        error = function(e) {
          private$logger("Error shutting down background Shiny app:")
          print(e)
        }
      )
    },
    set_listeners = function(on_ready, on_crash, on_logs) {
      private$on_ready <- on_ready
      private$on_crash <- on_crash
      private$on_logs <- on_logs

      private$start_listeners()
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

  local_url <- paste0("http://", path_to_app, ":", port)

  make_url_hosted_friendly(local_url)
}

# If we're on a hosted platform like RStudio workbench/server then we can't use
# localhost based urls and need to use rstudioapi's translateLocalUrl() function
# to send the appropriate URLS over to the client
make_url_hosted_friendly <- function(local_url) {

  has_rstudioapi <- rlang::is_installed("rstudioapi")
  # If we can, run the URL through rstudioapi's url translator, otherwise just
  # return the plain un-proxied url We also need to check to make sure that
  # we're running inside of RStudio before using the rstudio api package
  if (has_rstudioapi && !get_running_outside_rstudio()) {
    rstudioapi::translateLocalUrl(local_url, absolute = TRUE)
  } else {
    local_url
  }
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
