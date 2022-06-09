#' Launch ui editor server
#'
#' Spins up an `httpuv` server that handles parsing and deparsing of the UI tree
#' and saving.
#'
#'
#' ## Stopping server When running with `run_in_background = TRUE`, it's
#' recommended you use the `$stop()` function in the returned list object
#' instead of the build in `$stop()` function on the returned `$server` object
#' as this will ensure the running Shiny app preview will also shutdown.
#'
#' @inheritParams httpuv::startServer
#' @param app_loc Path to directory containing Shiny app to be visually edited.
#'   Currently this only supports two-file app formats, and thus there needs to
#'   be a `ui.R` file in this directory. If file does not exist a default
#'   starter template will be used upon finishing will be saved to the path.
#' @param shiny_background_port Port to launch the running app preview on. Again
#'   only used for dev work.
#' @param app_preview Should a live version of the Shiny app being edited run
#'   and auto-show updates made? You may want to disable this if the app has
#'   long-running or processor intensive initialization steps.
#' @param show_logs Print status messages to the console? For debugging.
#' @param show_preview_app_logs Should the logged output of the app preview be
#'   printed? Useful for debugging an app that's not working properly.
#' @param launch_browser Should the browser be automatically opened to the
#'   editor?
#' @param run_in_background Should the app run in a background process or block
#'   the console? See `?httpuv::startServer()` vs `?httpuv::runServer()`. Note
#'   that this potentially will result in orphaned Shiny processes because
#'   there's no way to know when the user is done with the app preview. Use with
#'   caution.
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
                          app_preview = TRUE,
                          show_logs = TRUE,
                          show_preview_app_logs = TRUE,
                          launch_browser = TRUE,
                          run_in_background = FALSE) {


  writeLog <- function(...) {
    if (show_logs) {
      logger(...)
    }
  }

  # Check and make sure that the app location provided actually has an app
  # app_status <- check_and_validate_app(app_loc)
  #
  # if (!app_status$is_valid){
  #   logger(app_status$message)
  #   invisible(return())
  # }

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

  # Cleanup on closing of the server... This should be be ignored when we're
  # running in the background, however, otherwise it will kill the shiny server
  # immediately (if it's started immediately).
  cleanup_on_end <- function() {
    # Stop all the event listeners
    preview_app$cleanup()
  }

  on.exit({
    if (run_in_background) {
      return()
    }
    cleanup_on_end()
  })

  # This needs to go before we actually start the server in case we're running
  # in blocking mode, which would prevent anything after from ever being run
  location_of_editor <-  paste0("http://localhost:", port, "/app")
  loaded_msg <- ascii_box(
    paste("Live editor running at", location_of_editor)
  )
  cat(crayon::bold(loaded_msg))

  startup_fn <- if (run_in_background) {
    httpuv::startServer
  } else {
    httpuv::runServer
  }

  if (launch_browser) {
    utils::browseURL(location_of_editor)
  }

  ui_file <- get_app_ui_file(app_loc)
  app_info <- NULL

  # TODO: If in background mode, wrap the return with a callback that cleans
  # stuff up for us
  s <- startup_fn(
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
          },
          "/app-please" = function(body) {
            writeLog("=> Parsing app blob and sending to client")

            app_info <<- get_file_ui_definition_info(
              file_lines = readLines(ui_file$path),
              type = ui_file$type
            )

            json_response(app_info$ui_tree)
          }
        ),
        "POST" = list(
          "/UiDump" = function(body) {
            text_response("App Dump received, thanks")

            updated_file_lines <- replace_ui_definition(
              file_info = app_info,
              new_ui_tree = body
            )

            writeLines(
              text = updated_file_lines,
              con = ui_file$path
            )

            writeLog("<= Saved new ui state from client")
          },
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
        cat("Server connection opened.\n")

        msg_when_ready(preview_app, ws)
        msg_app_logs(preview_app, ws)

        listen_for_crash(preview_app, ws)

        ws$onMessage(function(binary, message) {

          # cat("Server received message:", message, "\n")

          # TODO: This logic needs some work as it only successfully restarts
          # one time then complains of reused TCP addresses

          if (message == "RESTART_PREVIEW") {
            cat("Triggering Restart\n")
            preview_app$restart()

            Sys.sleep(1)
            writeLog("Restarted app, listening for ready and new crashes...\n")
            msg_when_ready(preview_app, ws)
            listen_for_crash(preview_app, ws, "restart")
          }

          if (message == "STOP_PREVIEW") {
            cat("Triggering STOP\n")
            preview_app$stop()
          }
        })

        ws$onClose(function() {
          cat("Server connection closed.\n")
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

  # This point only gets reached when in background mode otherwise we'd block on
  # the startup call above
  list(
    server = s,
    stop = function() {
      s$stop()
      cleanup_on_end()
    }
  )
}

logger <- function(...){
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


get_app_ui_file <- function(app_loc) {
  # We first try and look for a single app file
  single_file_app_script <- fs::path(app_loc, "app.R")

  if (fs::file_exists(single_file_app_script)) {
    return(
      list(path = single_file_app_script, type = "single-file")
    )
  }


  plain_ui_file <- fs::path(app_loc, "ui.R")

  if (fs::file_exists(plain_ui_file)) {
    return(
      list(path = plain_ui_file, type = "multi-file")
    )
  }

  stop(
    "Can't find an app.R or ui.R file in the provided app_loc. ",
    "Make sure your working directory is properly set"
  )

}


save_ui_to_file <- function(ui_string, ui_file_loc) {
  writeLines(
    text = ui_string,
    con = ui_file_loc
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
      lobstr::tree(list(uiName, uiArguments))
      lobstr::tree(e)
      list(
        type = "error",
        error_msg = as.character(e)
      )
    }
  )
}
