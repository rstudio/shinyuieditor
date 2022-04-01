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
launch_editor <- function(
    ui_loc,
    host = "127.0.0.1",
    port = 8888,
    shiny_background_port = 4444,
    show_logs = TRUE,
    run_in_background = FALSE
) {

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

    shiny_background_process$url
  }


  handleGet <- function(path) {
    if (path == "/app-please") {
      writeLog("=> Parsing app blob and sending to client")
      return(jsonResponse(get_ui_from_file(ui_loc)))
    }

    if (path == "/shiny-app-location") {
      writeLog("=> Sending over location of running Shiny App")
      return(jsonResponse(get_running_app_location()))
    }

    stop(paste0("No call endpoint defined for path '", path, "'."))
  }


  validate_ui_fn_call <- function(uiName, uiArguments) {
    tryCatch(
      {
        writeLog("Validating ui call")
        generated_html <- do_call_namespaced(what = uiName, args = uiArguments)

        list(
          type = "valid",
          uiHTML = as.character(generated_html)
        )
      },
      error = function(e) {
        writeLog("~ Function call errored")
        lobstr::tree(list(uiName, uiArguments))
        lobstr::tree(e)
        list(
          type = "error",
          error_msg = as.character(e)
        )
      }
    )
  }


  ui_tree <- list()
  handlePost <- function(path, body) {
    # Remove the prefixing slash so we can switch on path easier
    path <- str_remove(path, "^\\/")

    parsed_body <- jsonlite::parse_json(body)
    switch(path,
           UiDump = {
             ui_tree <<- parsed_body
             updated_ui_string <- generate_ui_code(parsed_body)
             save_ui_to_file(updated_ui_string, ui_loc)
             writeLog("<= Saved new ui state from client")

             list(
               status = 200L,
               headers = list("Content-Type" = "text/html"),
               body = "App Dump received, thanks"
             )
           },
           ValidateArgs = {
             writeLog("~ Calling ui function with supplied arguments")
             jsonResponse(validate_ui_fn_call(parsed_body$uiName, parsed_body$uiArguments))
           },
           stop("Unsupported POST path")
    )
  }

  startup_fn <- if (run_in_background) httpuv::startServer else httpuv::runServer

  # Cleanup on closing of the server... This should be be ignored when we're
  # running in the background, however, otherwise it will kill the shiny server
  # immediately (if it's started immediately).
  on.exit({
    if (run_in_background) { return() }
    if (!is.null(shiny_background_process) ) {
      writeLog("=> Shutting down running shiny app...")

      shiny_background_process$kill()

      if(shiny_background_process$is_alive()){
        warning("Encountered issue shutting down running Shiny app")
      }
    }
  })

  # This needs to go before we actually start the server in case we're running
  # in blocking mode, which would prevent anything after from ever being run
  cat(paste0("Live editor running at http://localhost:", port, "/app\n"))

  s <- startup_fn(
    host = "0.0.0.0", port = port,
    app = list(
      call = function(req) {
        tryCatch(
          switch(req$REQUEST_METHOD,
                 GET = handleGet(req$PATH_INFO),
                 POST = handlePost(req$PATH_INFO, body = get_post_body(req)),
                 stop("Unknown request method")
          ),
          error = function(e) {
            print("Failed to handle request.")
            print(e)
            list(
              status = 400L,
              headers = list("Content-Type" = "text/html"),
              body = e$message
            )
          }
        )
      },
      staticPaths = list(
        "/app" =
          httpuv::staticPath(
            PATH_TO_REACT_APP,
            indexhtml = TRUE
          )
      )
    )
  )
}


start_shiny_in_background <- function(app_loc, host, port){
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

  path_to_app <- if(host == "0.0.0.0") {
    # Don't use 0.0.0.0 directly as browsers don't give it a free pass for lack
    # of SSL like they do localhost and 127.0.0.1
    '127.0.0.1'
  } else {
    host
  }

  list(
    url =  paste0("http://", path_to_app, ":", port),
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
