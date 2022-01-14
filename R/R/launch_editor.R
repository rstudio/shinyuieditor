#' Launch visual editor server
#'
#' Spins up an `httpuv` server that handles parsing and deparsing of the UI tree
#' and saving.
#'
#' @param ui_loc Path to the `ui.R` file containing the ui to be edited. If file
#'   does not exist a default starter template will be used upon finishing will
#'   be saved to the path.
#' @param port Port to launch server on. Should only be changed for dev work.
#' @param show_logs Print status messages to the console? For debugging.
#' @param run_in_background Should the app run in a background process or block
#'   the console? See `?httpuv::startServer()` vs `?httpuv::runServer()`.
#'
#' @return An `httpuv` app server object (as returned by `httpuv::startServer`).
#'   To terminate before finishing with the app run `s$stop()` (assuming `s` is
#'   the return value of this function.)
#' @export
#'
launch_editor <- function(ui_loc, port=8888, show_logs = TRUE, run_in_background = FALSE){

  writeLog <- function(msg){
    if(show_logs){
      cat(msg, "\n")
    }
  }

  get_app_blob <- function(){
    jsonlite::toJSON(get_ui_from_file(ui_loc), auto_unbox = TRUE)
  }

  handleGet <- function(path){
    if (path != "/app-please") stop("Only /app-please path supported for GET requests")

    writeLog("=> Parsing app blob and sending to client")
    list(
      status = 200L,
      headers = list('Content-Type' = 'application/json'),
      body = get_app_blob()
    )
  }

  handlePost <- function(path, body){
    if (path != "/UiDump") stop("Only /UiDump path supported for POST requests")

    parsed_layout <- jsonlite::parse_json(body)

    updated_ui_string <- to_gridlayout_ui(parsed_layout)
    save_ui_to_file(updated_ui_string, ui_loc)
    writeLog("<= Saved new ui state from client")

    list(
      status = 200L,
      headers = list('Content-Type' = 'text/html'),
      body = "App Dump received, thanks"
    )

    writeLog("Shutting down server...")

    # s$stop() # or httpuv::interupt() if in blocking mode
  }

  startup_fn <- if(run_in_background) httpuv::startServer else httpuv::runServer

  s <- startup_fn(
    host = "0.0.0.0", port = port,
    app = list(call = function(req){
      tryCatch(
        switch(
          req$REQUEST_METHOD,
          GET = handleGet(req$PATH_INFO),
          POST = handlePost(req$PATH_INFO, body = get_post_body(req)),
          stop("Unknown request method")
        ),
        error = function(e) {
          print("Failed to handle request.")
          print(e)
          list(
            status = 400L,
            headers = list('Content-Type' = 'text/html'),
            body = e$message
          )
        }
      )
    })
  )


  writeLog(paste("Server listening on port", port))

  s
}


get_ui_from_file <- function(file_loc){
  ui_defn_text <- paste(readLines(file_loc), collapse = "\n")
  ui_expr <- rlang::parse_exprs(ui_defn_text)[[1]]
  parse_ui_fn(ui_expr) %>% parse_gridlayout()
}

save_ui_to_file <- function(ui_string, file_loc){
  writeLines(
    text = ui_string,
    con = file_loc
  )
}
