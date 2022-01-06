# Basic server to communicate between react app and R

library(httpuv)
library(here)


call <- function(req){
  # lobstr::tree(req)
  method <- req$REQUEST_METHOD

  print(paste("App send a http request of method", method))
  print(rawToChar(req$rook.input$read()))
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
