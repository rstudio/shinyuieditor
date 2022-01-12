# Basic server to communicate between react app and R

library(httpuv)
library(here)
library(magrittr)


get_ui_from_file <- function(file_loc){
  print("Getting ui from file")
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

handleGet <- function(path){
  if (path != "/app-please") stop("Only /app-please path supported for GET requests")
  list(
    status = 200L,
    headers = list('Content-Type' = 'application/json'),
    body = jsonlite::toJSON(get_ui_from_file(here("webapp/ui.R")), auto_unbox = TRUE)
  )
}

handlePost <- function(path, body){
  if (path != "/UiDump") stop("Only /UiDump path supported for POST requests")

  parsed_layout <- jsonlite::parse_json(body)

  updated_ui_string <- to_gridlayout_ui(parsed_layout)
  cat("Generated ui.R\n============================================================\n",
      updated_ui_string,
      "\n============================================================\n")
  save_ui_to_file(updated_ui_string, here("webapp/ui.R"))

  list(
    status = 200L,
    headers = list('Content-Type' = 'text/html'),
    body = "App Dump received, thanks"
  )
}

call <- function(req){
  tryCatch(
    switch(
      req$REQUEST_METHOD,
      GET = handleGet(req$PATH_INFO),
      POST = handlePost(req$PATH_INFO, body = rawToChar(req$rook.input$read())),
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
    },
    finally = print("Finished request handling")
  )
}



s <- startServer(
  host = "0.0.0.0", port = 8888,
  app = list(call = function(req) { call(req) })
)

# s$stop()
