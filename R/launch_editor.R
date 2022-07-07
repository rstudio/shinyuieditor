#' Launch ui editor server
#'
#' Spins up an `httpuv` server that handles parsing and deparsing of the UI tree
#' and saving.
#'
#'
#' @inheritParams httpuv::startServer
#' @param app_loc Path to directory containing Shiny app to be visually edited.
#'   Currently this only supports two-file app formats, and thus there needs to
#'   be a `ui.R` file in this directory. If file does not exist a default
#'   starter template will be used upon finishing will be saved to the path.
#' @param shiny_background_port Port to launch the running app preview on. Again
#'   only used for dev work.
#' @param remove_namespace Should namespaces be stripped from the generated UI
#'   code? Set to `FALSE` if you prefer the style of `shiny::sliderInput()` to
#'   `sliderInput()`. If set to `TRUE`, then any libraries needed for the nodes
#'   will be loaded at the top of your `app.R` or `ui.R`.
#' @param app_preview Should a live version of the Shiny app being edited run
#'   and auto-show updates made? You may want to disable this if the app has
#'   long-running or processor intensive initialization steps.
#' @param show_logs Print status messages to the console? For debugging.
#' @param show_preview_app_logs Should the logged output of the app preview be
#'   printed? Useful for debugging an app that's not working properly.
#' @param launch_browser Should the browser be automatically opened to the
#'   editor?
#' @param stop_on_browser_close Should the editor server end when the browser window
#'   is closed or is dormant for too long. Set this to false if you want to try
#'   running the app in a different browser or refreshing the browser etc..
#'
#' @return A list containing the `$server`: The app server object (as returned
#'   by `httpuv::startServer`) and the function `$stop()` for safely terminating
#'   the server and preview shiny app.
#' @export
#'
launch_editor <- function(app_loc,
                          host = "127.0.0.1",
                          port = httpuv::randomPort(),
                          shiny_background_port = httpuv::randomPort(),
                          remove_namespace = TRUE,
                          app_preview = TRUE,
                          show_logs = TRUE,
                          show_preview_app_logs = TRUE,
                          launch_browser = TRUE,
                          stop_on_browser_close = TRUE) {
  writeLog <- function(...) {
    if (show_logs) {
      cat(..., "\n", file = stderr())
    }
  }

  # Check and make sure that the app location provided actually has an app
  app_status <- check_and_validate_app(app_loc)
  if (!app_status$is_valid) {
    stop("Stopping UI Editor. Reason:", app_status$message)
  }

  app_preview <- AppPreview$new(
    app_loc = app_loc,
    port = shiny_background_port,
    host = host,
    print_logs = show_preview_app_logs,
    logger = writeLog
  )

  # Empty function so variable can always be called even if the timeout hasn't
  # been initialized
  app_close_watcher <- WatchForAppClose$new(
    on_close = if (stop_on_browser_close) {
      function() {
        writeLog("Editor window closed, stopping server")
        rlang::interrupt()
      }
    }
  )

  # Basic info about the file used to declare the UI we're editing along with
  # poll to detect when the ui-providing script has changed which is used to
  # update the client-state as changes are made to script directly
  ui_def <- UiFileDefinition$new(app_loc)

  # Cleanup on closing of the server...
  on.exit({
    # Stop all the event listeners
    app_preview$stop_app()
    ui_def$cleanup()
    app_close_watcher$cleanup()
  })


  # Let the user know that the ui editor is ready for them to use and optionally
  # open the browser to it for them
  announce_location_of_editor(port, launch_browser)

  httpuv::runServer(
    host = host, port = port,
    app = list(
      onWSOpen = function(ws) {

        # Start listening for the file on disk changing to update the client
        # with a new tree when it happens
        ui_def$on_file_change(send_ui_state_to_client)

        send_ui_state_to_client <- function() {
          writeLog("=> Parsing app blob and sending to client")
          ws$send(
            build_ws_message("INITIAL-DATA", ui_def$get_ui_tree())
          )
        }

        # Cancel any app close timeouts that may have been caused by the
        # user refreshing the page
        app_close_watcher$connection_opened()

        # The ws object is a WebSocket object
        ws$onMessage(function(binary, raw_message) {

          # The messages all come over in binary blob format with a type and an
          # optional payload field.
          message <- jsonlite::fromJSON(
            rawToChar(raw_message),
            simplifyVector = FALSE
          )

          switch(message$path,
            "APP-PREVIEW-CONNECTED" = {
              app_preview$set_listeners(
                on_ready = function() {
                  ws$send(
                    build_ws_message(
                      "SHINY_READY",
                      payload = app_preview$url
                    )
                  )
                },
                on_crash = function() {
                  ws$send(
                    build_ws_message(
                      "SHINY_CRASH",
                      payload = "uh-oh"
                    )
                  )
                },
                on_logs = function(log_lines) {
                  ws$send(
                    build_ws_message(
                      "SHINY_LOGS",
                      payload = log_lines
                    )
                  )
                }
              )
            },
            "APP-PREVIEW-RESTART" = {
              app_preview$restart()
            },
            "APP-PREVIEW-STOP" = {
              app_preview$stop_app()
            },
            "READY-FOR-STATE" = {
              send_ui_state_to_client()
            },
            "STATE-UPDATE" = {
              ui_def$update_ui_file(message$payload, remove_namespace)
              writeLog("<= Saved new ui state from client")
            }
          )
        })

        ws$onClose(function() {
          # When the websocket connection closes we start the timer to check if
          # it's a reload or a proper-closing of the window
          app_close_watcher$connection_closed()
        })
      },
      staticPaths = list(
        "/" = httpuv::staticPath(
          system.file("ui-editor-react/build", package = "shinyuieditor"),
          indexhtml = TRUE
        )
      )
    )
  )
}


build_ws_message <- function(path, payload) {
  jsonlite::toJSON(list(
    path = path,
    payload = payload
  ), auto_unbox = TRUE)
}



announce_location_of_editor <- function(port, launch_browser) {
  location_of_editor <- paste0("http://localhost:", port)
  cat(crayon::bold(ascii_box(
    paste("Live editor running at", location_of_editor)
  )))

  if (launch_browser) {
    utils::browseURL(location_of_editor)
  }
}
