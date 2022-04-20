#' Launch visual editor server
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
                          run_in_background = FALSE) {
  writeLog <- function(msg) {
    if (show_logs) {
      # TODO: Move these to standard error as they are meant for human consumption
      cat(msg, "\n")
    }
  }

  # Check and make sure that the app location provided actually has an app
  has_existing_app <- fs::dir_exists(app_loc)

  if (!has_existing_app) {
    writeLog("No app found. Using starter template...")
    template_loc <- system.file("app-templates/geyser", package = "ShinyUiEditor")

    fs::dir_copy(template_loc, app_loc)
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
    show_logs = show_logs,
    show_preview_app_logs = show_preview_app_logs
  )

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
  cat(paste0("Live editor running at http://localhost:", port, "/app\n"))

  startup_fn <- if (run_in_background) httpuv::startServer else httpuv::runServer

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
            json_response(get_ui_from_file(app_loc))
          }
        ),
        "POST" = list(
          "/UiDump" = function(body) {
            updated_ui_string <- generate_ui_code(body)
            save_ui_to_file(updated_ui_string, app_loc)
            writeLog("<= Saved new ui state from client")
            text_response("App Dump received, thanks")
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

        on_crash <- preview_app$on_crash$subscribe(function(status){
          cat(crayon::bgCyan("Crash detected\n"))
          # Stop other event listeners

          ws$send(
            build_ws_message(
              "SHINY_CRASH",
              payload = "uh-oh"
            )
          )
          on_crash()
        })


        ws$onMessage(function(binary, message) {

          cat("Server received message:", message, "\n")

          # TODO: This logic needs some work as it only successfully restarts
          # one time then complains of reused TCP addresses

          if(message == "RESTART_PREVIEW"){
            cat("Triggering Restart\n")
            preview_app$restart()

            Sys.sleep(2)

            cat("Waiting for the app to say it's shut-down...\n")

            on_crash <- preview_app$on_crash$subscribe(function(status){
              cat(crayon::bgCyan("Crash detected\n"))
              # Stop other event listeners
              preview_app$cleanup()

              preview_app <- start_background_shiny_app(
                app_loc = app_loc,
                port = shiny_background_port,
                host = host,

                show_logs = show_logs,
                show_preview_app_logs = show_preview_app_logs
              )

              # resubscribe to events
              msg_when_ready(preview_app, ws)
              msg_app_logs(preview_app, ws)

              on_crash()
            })
          }
        })

        ws$onClose(function() {
          cat("Server connection closed.\n")
        })

      },
      staticPaths = list(
        "/app" = httpuv::staticPath(
          PATH_TO_REACT_APP,
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


msg_when_ready <- function(preview_app, ws){

  cat("Setting up listener for shiny ready")
  listen_for_ready <- preview_app$on_ready$subscribe(function(app_ready){

    cat("~~~~App Ready~~~~~\n")
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

msg_app_logs <- function(preview_app, ws){
  preview_app$on_log$subscribe(function(log_lines){
    ws$send(
      build_ws_message(
        "SHINY_LOGS",
        payload = log_lines
      )
    )
  })
}


build_ws_message <- function(type, payload){
  jsonlite::toJSON(list(
    msg = type,
    payload = payload
  ), auto_unbox = TRUE)
}


log_background_app <- function(lines){
  cat(
    paste0(
      crayon::bold$magenta("Logs from preview app:\n"),
      crayon::magenta(paste(lines, collapse = "\n")),
      "\n"
    )
  )
}

PATH_TO_REACT_APP <- system.file("ui-editor-react/build", package = "ShinyUiEditor")


get_app_ui_file <- function(app_loc) {
  plain_ui_file <- fs::path(app_loc, "ui.R")

  if (!fs::file_exists(plain_ui_file)) {
    stop(
      "Only two-file apps are supported at this point.",
      " Make sure that you're pointing to a folder with",
      " a ui.R and a server.R file defining your Shiny app."
    )
  }

  plain_ui_file
}



get_ui_from_file <- function(app_loc) {
  ui_defn_text <- paste(readLines(get_app_ui_file(app_loc)), collapse = "\n")
  ui_expr <- rlang::parse_exprs(ui_defn_text)[[1]]
  ui_expr |>
    parse_ui_fn() |>
    update_ui_nodes()
}

save_ui_to_file <- function(ui_string, app_loc) {
  writeLines(
    text = ui_string,
    con = get_app_ui_file(app_loc)
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
