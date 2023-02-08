# Wrap a single line of text in an ascii character box to draw attention to it
ascii_box <- function(msg) {
  horizontal_line <- paste(rep("-", nchar(msg) + 2), collapse = "")
  vertical_line <- "|"

  paste0(
    "\u250C", horizontal_line, "\u2510\n",
    vertical_line, " ", msg, " ", vertical_line, "\n",
    "\u2514", horizontal_line, "\u2518\n"
  )
}

# Format outgoing message into JSON to be read by client
format_outgoing_msg <- function(path, payload) {
  jsonlite::toJSON(
    list(path = path, payload = payload), 
    auto_unbox = TRUE
  )
}

# Parse the raw incoming messages into a list. Message should have path and
# payload attributes attached
parse_incoming_msg <- function(raw_msg) {
  jsonlite::fromJSON(
    rawToChar(raw_msg),
    simplifyVector = FALSE
  )
}

announce_location_of_editor <- function(port, launch_browser) {
  location_of_editor <- paste0("http://localhost:", port)
  cat(crayon::bold(ascii_box(
    paste("Live editor running at", location_of_editor)
  )))

  if (launch_browser) {
    utils::browseURL(location_of_editor)
  }
}