# Basic server to communicate between react app and R

library(httpuv)
library(here)
library(magrittr)

app_blob <- '
{
  "layout": {
    "type": "gridlayout",
    "options": {
      "gapSize": "1rem",
      "areas": [
        [   "title",  "title"],
        ["settings",   "plot"],
        [  "footer", "footer"]
      ],
      "rowSizes": [
        "100px",
        "1fr",
        "80px"
      ],
      "colSizes": [
        "250px",
        "1fr"
      ]
    }
  },
  "elements": {
    "title": {
      "uiName": "titlePanel",
      "uiArguments": {
        "title": "My App"
      }
    },
    "settings": {
      "uiName": "sliderInput",
      "uiArguments": {
        "name": "My slider!",
        "min": 5,
        "max": 10,
        "val": 7
      }
    },
    "plot": {
      "uiName": "plotOutput",
      "uiArguments": {
        "name": "My Plot!"
      }
    }
  }
}
' %>% jsonlite::parse_json()

handleGet <- function(path){

  if (path != "/app-please") stop("Only /app-please path supported for GET requests")

  list(
    status = 200L,
    headers = list('Content-Type' = 'application/json'),
    body = jsonlite::toJSON(app_blob, auto_unbox = TRUE)
  )
}

handlePost <- function(path, body){
  if (path != "/UiDump") stop("Only /UiDump path supported for POST requests")

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
      POST = handlePost(req$PATH_INFO, body = rawToChar(req$rook.input$read()))
    ),
    error = function(e) {
      print("Failed to handle request.")
      list(
        status = 400L,
        headers = list('Content-Type' = 'text/html'),
        body = e$message
      )
    },
    finally = print("Handled http request")
  )
}



s <- startServer(
  host = "0.0.0.0", port = 8888,
  app = list(
    call = function(req) { call(req) }
  )
)

# s$stop()
