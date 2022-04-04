#' Launch visual editor server
#'
#' Spins up an `httpuv` server that handles parsing and deparsing of the UI tree
#' and saving.
#'
#'
#' ## Stopping server When running with `run_in_background = TRUE`, it's
#' recomended you use the `$stop()` function in the returned list object instead
#' of the build in `$stop()` function on the returned `$server` object as this
#' will ensure the running Shiny app preview will also shutdown.
#'
#' @inheritParams httpuv::startServer
#' @param app_loc Path to directory containing Shiny app to be visually edited.
#'   Currently this only supports two-file app formats, and thus there needs to
#'   be a `ui.R` file in this directory. If file does not exist a default
#'   starter template will be used upon finishing will be saved to the path.
#' @param shiny_background_port Port to launch the running app preview on. Again
#'   only used for dev work.
#' @param show_logs Print status messages to the console? For debugging.
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
                          show_logs = TRUE,
                          run_in_background = FALSE) {
  writeLog <- function(msg) {
    if (show_logs) {
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
  shiny_background_process <- NULL

  # Getter for app running in background that will lazily launch the app.
  get_running_app_location <- function() {
    if (is.null(shiny_background_process)) {
      writeLog("=> No running shiny app... starting up first...")

      shiny_background_process <<- start_shiny_in_background(
        app_loc = app_loc,
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
  cleanup_on_end <- function() {
    if (run_in_background) {
      return()
    }
    if (!is.null(shiny_background_process)) {
      writeLog("=> Shutting down running shiny app...")

      tryCatch(
        {
          shiny_background_process$process$interrupt()
        },
        error = function(e) {
          print("Error shutting down background Shiny app:")
          print(e)
        }
      )
    }
  }

  on.exit({
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
          },
          "/shiny-app-location" = function(body) {
            json_response(get_running_app_location())
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

start_shiny_in_background <- function(app_loc, host, port) {
  p <- callr::r_bg(
    func = function(app_loc, host, port) {
      # Turn on live-reload and dev mode
      shiny::devmode(TRUE)
      options(shiny.autoreload = TRUE)
      shiny::runApp(app_loc, port = port, host = host)
    },
    args = list(app_loc, host, port),
    supervise = TRUE # Extra security for process being cleaned up properly
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
  ui_expr %>%
    parse_ui_fn() %>%
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
