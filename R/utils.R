
# Pull out name of call from an AST node in plain text
name_of_called_fn <- function(x) {
  deparse(x[[1]])
}

str_replace_all <- function(text, pattern, replacement, fixed = FALSE) {
  gsub(pattern = pattern, replacement = replacement, x = text, perl = !fixed, fixed = fixed)
}

# Indent a given string with newlines by two spaces 
indent_text_block <- function(txt) {
  str_replace_all(txt, "\\n", "\n  ")
}


# Via https://stackoverflow.com/questions/10022436/do-call-in-combination-with
do_call_namespaced <- function(what, args, ...) {
  if (is.function(what)) {
    what <- deparse(as.list(match.call())$what)
  }
  myfuncall <- parse(text = what)[[1]]
  mycall <- as.call(c(list(myfuncall), args))
  eval(mycall, ...)
}


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

ask_question <- function(..., answers) {
  cat(cat(paste0(..., collapse = "")))
  answers[utils::menu(answers)]
}


# Generate a series of lines loading an array of libraries
create_library_calls <- function(libraries) {
  vapply(
    X = libraries,
    FUN = function(l) paste0("library(", l, ")"),
    FUN.VALUE = character(1L)
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