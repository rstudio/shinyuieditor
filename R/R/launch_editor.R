#' Launch visual editor server
#'
#' Spins up an `httpuv` server that handles parsing and deparsing of the UI tree
#' and saving.
#'
#' @inheritParams httpuv::startServer
#' @param ui_loc Path to the `ui.R` file containing the ui to be edited. If file
#'   does not exist a default starter template will be used upon finishing will
#'   be saved to the path.
#' @param shiny_background_port Port to launch the running app preview on. Again
#'   only used for dev work.
#' @param show_logs Print status messages to the console? For debugging.
#' @param run_in_background Should the app run in a background process or block
#'   the console? See `?httpuv::startServer()` vs `?httpuv::runServer()`. Note
#'   that this potentially will result in orphaned Shiny processes because
#'   there's no way to know when the user is done with the app preview. Use with
#'   caution.
#'
#' @return An `httpuv` app server object (as returned by `httpuv::startServer`).
#'   To terminate before finishing with the app run `s$stop()` (assuming `s` is
#'   the return value of this function.)
#' @export
#'
launch_editor <- function(ui_loc,
                          host = "127.0.0.1",
                          port = httpuv::randomPort(),
                          shiny_background_port = httpuv::randomPort(),
                          show_logs = TRUE,
                          run_in_background = FALSE) {
  writeLog <- function(msg) {
    if (show_logs) {
      cat(msg, "\n")
    }
  }

  # Logic for starting up Shiny app in background and returning the app URL.
  # Will only start up the app once

  # Gets replaced with callR R6 object after first call of get_running_app
  shiny_background_process <- NULL

  # Getter for app running in background that will lazily launch the app.
  get_running_app_location <- function() {
    if (is.null(shiny_background_process)) {
      writeLog("=> No running shiny app... starting up first...")

      shiny_background_process <<- start_shiny_in_background(
        app_loc = "webapp",
        port = shiny_background_port,
        host = host
      )

      writeLog(paste("=> ...Shiny app running in background: PID =", shiny_background_process$process$get_pid()))
    }

    writeLog("=> Sending over location of running Shiny App")
    shiny_background_process$url
  }


  # Cleanup on closing of the server... This should be be ignored when we're
  # running in the background, however, otherwise it will kill the shiny server
  # immediately (if it's started immediately).
  on.exit({
    if (run_in_background) {
      return()
    }
    if (!is.null(shiny_background_process)) {
      writeLog("=> Shutting down running shiny app...")

      tryCatch(
        {
          shiny_background_process$process$interrupt()

          Sys.sleep(1)

          if (shiny_background_process$process$is_alive()) {
            stop("Shiny app not terminated")
          }
        },
        error = function(e) {
          print("Error shutting down background Shiny app:")
          print(e)
        }
      )
    }
  })


  # This needs to go before we actually start the server in case we're running
  # in blocking mode, which would prevent anything after from ever being run
  cat(paste0("Live editor running at http://localhost:", port, "/app\n"))

  startup_fn <- if (run_in_background) httpuv::startServer else httpuv::runServer
  startup_fn(
    host = host, port = port,
    app = list(
      call = build_run_handler(list(
        "GET" = list(
          "/app-please" = function(body) {
            writeLog("=> Parsing app blob and sending to client")
            json_response(get_ui_from_file(ui_loc))
          },
          "/shiny-app-location" = function(body) {
            json_response(get_running_app_location())
          }
        ),
        "POST" = list(
          "/UiDump" = function(body) {
            updated_ui_string <- generate_ui_code(body)
            save_ui_to_file(updated_ui_string, ui_loc)
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
      staticPaths = list(
        "/app" = httpuv::staticPath(
          PATH_TO_REACT_APP,
          indexhtml = TRUE
        )
      )
    )
  )
}


start_shiny_in_background <- function(app_loc, host, port) {
  p <- callr::r_bg(
    func = function(app_loc, host, port) {
      # Turn on live-reload and dev mode
      shiny::devmode(TRUE)
      options(shiny.autoreload = TRUE)
      shiny::runApp(app_loc, port = port, host = host)
    },
    args = list(app_loc, host, port)
  )

  # Give the app a tiny bit to spin up
  Sys.sleep(1)

  path_to_app <- if (host == "0.0.0.0") {
    # Don't use 0.0.0.0 directly as browsers don't give it a free pass for lack
    # of SSL like they do localhost and 127.0.0.1
    "127.0.0.1"
  } else {
    host
  }

  list(
    url = paste0("http://", path_to_app, ":", port),
    process = p
  )
}

PATH_TO_REACT_APP <- "/Users/nicholasstrayer/dev/Shiny-Visual-Editor/build"

get_ui_from_file <- function(file_loc) {
  ui_defn_text <- paste(readLines(file_loc), collapse = "\n")
  ui_expr <- rlang::parse_exprs(ui_defn_text)[[1]]
  ui_expr %>%
    parse_ui_fn() %>%
    update_ui_nodes()
}

save_ui_to_file <- function(ui_string, file_loc) {
  writeLines(
    text = ui_string,
    con = file_loc
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
