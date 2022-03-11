# Basic server to communicate between react app and R
ui_loc <- here::here("webapp/ui.R")
port <- 8888
run_in_background <- TRUE
show_logs <- TRUE
devtools::load_all(".")


# Turn on live-reload and dev mode
shiny::devmode(TRUE)
options(shiny.autoreload = TRUE)

writeLog <- function(msg){
  if(show_logs){
    cat(msg, "\n")
  }
}


handleGet <- function(path){
  if (path != "/app-please") stop("Only /app-please path supported for GET requests")

  writeLog("=> Parsing app blob and sending to client")

  jsonResponse(get_ui_from_file(ui_loc))
}


validate_ui_fn_call <- function(uiName, uiArguments){
  # return( list(
  #   type="error",
  #   error_msg = 'That was not a good attempt...'
  # ))
  tryCatch({
    print("Validating ui call")
    generated_html <- do_call_namespaced(what = uiName, args = uiArguments)

    list(
      type="valid",
      uiHTML = as.character(generated_html)
    )
  },
  error = function(e){
    writeLog("~ Function call errored")
    lobstr::tree(list(uiName, uiArguments))
    lobstr::tree(e)
    list(
      type="error",
      error_msg = as.character(e)
    )
  })
}


ui_tree <- list()
handlePost <- function(path, body){
  # Remove the prefixing slash so we can switch on path easier
  path <- str_remove(path, "^\\/")

  parsed_body <- jsonlite::parse_json(body)
  switch(
    path,
    UiDump = {

      # print(parsed_body)
      ui_tree <<- parsed_body
      updated_ui_string <- generate_ui_code(parsed_body)
      save_ui_to_file(updated_ui_string, ui_loc)
      writeLog("<= Saved new ui state from client")

      list(
        status = 200L,
        headers = list('Content-Type' = 'text/html'),
        body = "App Dump received, thanks"
      )
    },
    ValidateArgs = {
      writeLog("~ Calling ui function with supplied arguments")
      jsonResponse(validate_ui_fn_call(parsed_body$uiName, parsed_body$uiArguments))
    },
    stop("Unsupported POST path")
  )


  # writeLog("Shutting down server...")


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
