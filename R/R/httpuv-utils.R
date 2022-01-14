
# Send a list as a json blob to client
jsonResponse <- function(response_obj){
  list(
    status = 200L,
    headers = list('Content-Type' = 'application/json'),
    body = jsonlite::toJSON(response_obj, auto_unbox = TRUE)
  )
}


# Get message body from a POST request
get_post_body <- function(req){
  rawToChar(req$rook.input$read())
}
