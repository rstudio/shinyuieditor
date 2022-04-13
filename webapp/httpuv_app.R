devtools::load_all(".")


launch_editor(
  ui_loc = here::here("webapp/ui.R"),
  port = 9000
)

# Basic server to communicate between react app and R
ui_loc <- here::here("webapp/ui.R")
httpuv_port <- 8888
shiny_background_port <- 4444
host <- "127.0.0.1"
run_in_background <- TRUE
show_logs <- TRUE

PATH_TO_REACT_APP <- "/Users/nicholasstrayer/dev/Shiny-Visual-Editor/build"



writeLog <- function(msg){
  if(show_logs){
    cat(msg, "\n")
  }
}


# Logic for starting up Shiny app in background and returning the app URL.
# Will only start up the app once

# Gets replaced with callR R6 object after first call of get_running_ap
shiny_background_process <- NULL

running_app_location <- paste0("http://127.0.0.1:", shiny_background_port)

get_running_app_location <- function() {
  if (is.null(shiny_background_process)) {
    writeLog("=> No running shiny app... starting up first...")

    shiny_background_process <<- callr::r_bg(function(port, host) {
      # Turn on live-reload and dev mode
      shiny::devmode(TRUE)
      options(shiny.autoreload = TRUE)
      shiny::runApp("webapp", port = port, host = host)
    }, args = list(shiny_background_port, host))

    # Give the app a tiny bit to spin up
    Sys.sleep(1)
  } else {
    writeLog("=> Shiny app already running...")
  }

  running_app_location
}



handleGet <- function(path){

  if (path == "/app-please"){
    writeLog("=> Parsing app blob and sending to client")
    return(jsonResponse(get_ui_from_file(ui_loc)))
  }

  if (path == "/shiny-app-location"){
    writeLog("=> Sending over location of running Shiny App")
    return(jsonResponse(get_running_app_location()))
  }

  stop(paste0("No call endpoint defined for path '", path ,"'."))
}


validate_ui_fn_call <- function(uiName, uiArguments){

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
}

startup_fn <- if(run_in_background) httpuv::startServer else httpuv::runServer

s <- startup_fn(
  host = "0.0.0.0", port = httpuv_port,
  app = list(
    call = function(req){
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

cat(paste0("Live editor running at http://localhost:",  httpuv_port, "/app\n"))
