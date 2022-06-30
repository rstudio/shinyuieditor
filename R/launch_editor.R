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
                          stop_on_browser_close = TRUE ) {

  writeLog <- function(...) {
    if (show_logs) {
      logger(...)
    }
  }

  # Check and make sure that the app location provided actually has an app
  app_status <- check_and_validate_app(app_loc)
  if (!app_status$is_valid) {
    logger("Stopping UI Editor. Reason:", app_status$message)
    return(invisible())
  }

  # Logic for starting up Shiny app in background and returning the app URL.
  # Will only start up the app once

  # Gets replaced with list containing callR R6 object and url of app after
  # first call of get_running_app
  # shiny_background_process <- NULL
  writeLog("=> Starting Shiny preview app...")
  preview_app <- start_background_shiny_app(
    app_loc = app_loc,
    port = shiny_background_port,
    host = host,
    writeLog = writeLog,
    show_preview_app_logs = show_preview_app_logs
  )

  failure_to_start_check <- preview_app$on_crash(function(is_dead) {
    stop("Failed to start up shiny app. Check logs for more info:")
  })

  app_is_ready_check <- preview_app$on_ready(function(app_ready) {
    writeLog("~~~~App Ready~~~~~\n")
    failure_to_start_check()

    # Once we get the ready signal, turn off the subscription
    app_is_ready_check()
  })


  writeLog("=> ...Shiny app running in background")

  # Cleanup on closing of the server...
  on.exit({
    # Stop all the event listeners
    preview_app$cleanup()
  })

  # This needs to go before we actually start the server in case we're running
  # in blocking mode, which would prevent anything after from ever being run
  location_of_editor <- paste0("http://localhost:", port, "/app")
  loaded_msg <- ascii_box(
    paste("Live editor running at", location_of_editor)
  )
  cat(crayon::bold(loaded_msg))

  if (launch_browser) {
    utils::browseURL(location_of_editor)
  }


  ui_file <- get_app_ui_file(app_loc)
  app_info <- NULL


  # Empty function so variable can always be called even if the timeout hasn't
  # been initialized
  app_close_timeout <- function(){ }
  start_app_close_timeout <- function() {
    if (!stop_on_browser_close) return()
    # Trigger an interrupt to stop the server if the browser
    # unmounts and then doesn't re-connect within a timeframe
    app_close_timeout <<- later::later(function() {
      writeLog("Stopping ui editor server")
      rlang::interrupt();
    }, delay = 0.5)
  }

  httpuv::runServer(
    host = host, port = port,
    app = list(
      call = build_run_handler(list(
        "GET" = list(
          "/" = function(body) {
            # Redirect root paths to the app path
            list(
              status = 308L,
              headers = list("Location" = "/app")
            )
          }
        ),
        "POST" = list(
          # "/UiDump" = function(body) {
          #
          #   updated_file_lines <- update_ui_definition(
          #     file_info = app_info,
          #     new_ui_tree = body,
          #     remove_namespace = remove_namespace
          #   )
          #
          #   writeLines(
          #     text = updated_file_lines,
          #     con = ui_file$path
          #   )
          #
          #   writeLog("<= Saved new ui state from client")
          #   text_response("App Dump received, thanks")
          # },
          "/ValidateArgs" = function(body) {
            json_response(
              validate_ui_fn_call(
                body$uiName,
                body$uiArguments,
                log_fn = writeLog
              )
            )
          }
        )
      )),
      onWSOpen = function(ws) {
        # The ws object is a WebSocket object

        ws$onMessage(function(binary, raw_message) {

          message <- jsonlite::fromJSON(rawToChar(raw_message))

          if (message$type == "APP-PREVIEW-CONNECTED") {
            writeLog("Preview app connection opened.\n")
            msg_when_ready(preview_app, ws)
            msg_app_logs(preview_app, ws)
            listen_for_crash(preview_app, ws)
          }
          if(message$type == "APP-PREVIEW-RESTART"){
            writeLog("Restarting app preview process\n")
            preview_app$restart()

            Sys.sleep(1)
            writeLog("Restarted app preview, listening for ready and new crashes...\n")
            msg_when_ready(preview_app, ws)
            listen_for_crash(preview_app, ws, "restart")
          }
          if(message$type == "APP-PREVIEW-STOP"){
            writeLog("Stopping app preview process\n")
            preview_app$stop()
          }

          if (message$type == "INITIAL-LOAD-DATA") {
            writeLog("=> Parsing app blob and sending to client")

            # Cancel any app close timeouts that may have been caused by the
            # user refreshing the page
            app_close_timeout()

            app_info <<- get_file_ui_definition_info(
              file_lines = readLines(ui_file$path),
              type = ui_file$type
            )

            ws$send(
              build_ws_message(
                "INITIAL-DATA",
                app_info$ui_tree
              )
            )
          }

          if (message$type == "UI-DUMP") {
            updated_file_lines <- update_ui_definition(
              file_info = app_info,
              new_ui_tree = body,
              remove_namespace = remove_namespace
            )

            writeLines(
              text = updated_file_lines,
              con = ui_file$path
            )

            writeLog("<= Saved new ui state from client")
          }
        })

        ws$onClose(function() {
          start_app_close_timeout()
          writeLog("Websocket connection with app preview lost.\n")
        })
      },
      staticPaths = list(
        "/app" = httpuv::staticPath(
          system.file("ui-editor-react/build", package = "shinyuieditor"),
          indexhtml = TRUE
        )
      )
    )
  )
}

logger <- function(...) {
  cat(..., "\n", file = stderr())
}

msg_when_ready <- function(preview_app, ws) {
  listen_for_ready <- preview_app$on_ready(function(app_ready) {
    ws$send(
      build_ws_message(
        "SHINY_READY",
        payload = preview_app$url
      )
    )

    # Once we get the ready signal, turn off the subscription
    listen_for_ready()
  })
}

msg_app_logs <- function(preview_app, ws) {
  preview_app$on_log(function(log_lines) {
    ws$send(
      build_ws_message(
        "SHINY_LOGS",
        payload = log_lines
      )
    )
  })
}


listen_for_crash <- function(preview_app, ws, id = 1) {
  on_crash <- preview_app$on_crash(function(is_alive) {
    cat(crayon::bgCyan("Crash detected id=", id, "\n"))

    ws$send(
      build_ws_message(
        "SHINY_CRASH",
        payload = "uh-oh"
      )
    )
    on_crash()
  })
}

build_ws_message <- function(type, payload) {
  jsonlite::toJSON(list(
    msg = type,
    payload = payload
  ), auto_unbox = TRUE)
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


validate_ui_fn_call <- function(uiName, uiArguments, log_fn) {
  tryCatch(
    {
      log_fn("Validating ui call")
      generated_html <- do_call_namespaced(what = uiName, args = uiArguments)

      list(
        type = "valid",
        uiHTML = as.character(generated_html)
      )
    },
    error = function(e) {
      log_fn("~ Function call errored")
      utils::str(list(uiName, uiArguments))
      utils::str(e)
      list(
        type = "error",
        error_msg = as.character(e)
      )
    }
  )
}
