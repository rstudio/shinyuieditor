
# Pull out name of call from an AST node in plain text
name_of_called_fn <- function(x) {
  deparse(x[[1]])
}

str_replace_all <- function(text, pattern, replacement, fixed = FALSE) {
  gsub(pattern = pattern, replacement = replacement, x = text, perl = !fixed, fixed = fixed)
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
