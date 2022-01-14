# Basic server to communicate between react app and R
ui_loc <- here::here("webapp/ui.R")
port <- 8888
run_in_background <- TRUE
show_logs <- TRUE
devtools::load_all(".")

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
  # Remove the prefixing slash so we can switch on path easier
  path <- str_remove(path, "^\\/")

  parsed_body <- jsonlite::parse_json(body)
  switch(
    path,
    UiDump = {

      updated_ui_string <- to_gridlayout_ui(parsed_body)
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
      fn_res <- tryCatch({
        as.character(do_call_namespaced(what = parsed_body$uiName, args = parsed_body$uiArguments))
      },
      error = function(e){
        writeLog("~ Function call errored")
        as.character(e)
      })

      list(
        status = 200L,
        headers = list('Content-Type' = 'text/html'),
        body = fn_res
      )
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
