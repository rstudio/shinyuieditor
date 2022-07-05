# Class to start up and manage the background process running the preview app
# shared with the shiny ui editor
AppPreview <- R6::R6Class(
  "AppPreview",
  public = list(
    app = NULL,
    logger = NULL,
    ws = NULL,
    initialize = function(app_loc, port, host, show_preview_app_logs, logger = function() {}) {
      logger("=> Starting Shiny preview app...")

      self$app <- start_background_shiny_app(
        app_loc = app_loc,
        port = port,
        host = host,
        writeLog = logger,
        show_preview_app_logs = show_preview_app_logs
      )

      failure_to_start_check <- self$app$on_crash(function(is_dead) {
        stop("Failed to start up shiny app. Check logs for more info:")
      })

      app_is_ready_check <- self$app$on_ready(function(app_ready) {
        logger("~~~~App Ready~~~~~\n")
        failure_to_start_check()

        # Once we get the ready signal, turn off the subscription
        app_is_ready_check()
      })

      logger("=> ...Shiny app running in background")
      self$logger <- logger
    },
    cleanup = function() {
      self$app$cleanup()
    },
    stop = function() {
      self$logger("Stopping app preview process\n")
      self$app$stop()
    },
    restart = function() {
      self$logger("Restarting app preview process\n")

      self$app$restart()

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
      listen_for_ready <- self$app$on_ready(function(app_ready) {
        self$ws$send(
          build_ws_message(
            "SHINY_READY",
            payload = self$app$url
          )
        )

        # Once we get the ready signal, turn off the subscription
        listen_for_ready()
      })
    },
    msg_app_logs = function() {
      self$app$on_log(function(log_lines) {
        self$ws$send(
          build_ws_message(
            "SHINY_LOGS",
            payload = log_lines
          )
        )
      })
    },
    listen_for_crash = function(id = 1) {
      on_crash <- self$app$on_crash(function(is_alive) {
        cat(crayon::bgCyan("Crash detected id=", id, "\n"))

        self$ws$send(
          build_ws_message(
            "SHINY_CRASH",
            payload = "uh-oh"
          )
        )
        on_crash()
      })
    }
  )
)
