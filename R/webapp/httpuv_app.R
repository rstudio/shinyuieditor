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

call <- function(req){

  if(req$REQUEST_METHOD == "GET" & req$PATH_INFO == "/app-please") {
    print("Client has requested app blob")
    return(
      list(
        status = 200L,
        headers = list('Content-Type' = 'application/json'),
        body = jsonlite::toJSON(app_blob, auto_unbox = TRUE)
      )
    )
  }
  req_body <- rawToChar(req$rook.input$read())

  body <- paste0("Time: ", Sys.time(), "<br>Path requested: ", req$PATH_INFO)
  list(
    status = 200L,
    headers = list('Content-Type' = 'text/html'),
    body = body
  )
}



s <- startServer(
  host = "0.0.0.0", port = 8888,
  app = list(
    call = function(req) {
      call(req)
    }
  )
)

s$stop()
