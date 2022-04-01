
# Send a list as a json blob to client
json_response <- function(response_obj){
  list(
    status = 200L,
    headers = list('Content-Type' = 'application/json'),
    body = jsonlite::toJSON(response_obj, auto_unbox = TRUE)
  )
}


# Get message body from a POST request
get_post_body <- function(req){
  jsonlite::parse_json(rawToChar(req$rook.input$read()))
}

run_handler <- function(handlers, req){
  method <- req$REQUEST_METHOD
  path <- req$PATH_INFO
  handlerFn <- handlers[[method]][[path]]

  if (is.null(handlerFn)) {
    stop(paste0("No call endpoint defined for path '", path, "'."))
  }

  handlerFn(get_post_body(req))
}
