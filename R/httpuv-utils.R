# Send a message over a the websocket to the client
ws_message <- function(ws, path, payload) {
  ws$send(
    jsonlite::toJSON(
      list(path = path, payload = payload), 
      auto_unbox = TRUE
    )
  )
}
