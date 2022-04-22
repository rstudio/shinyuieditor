
# Pull out name of call from an AST node in plain text
called_uiName <- function(x) {
  deparse(x[[1]])
}



# There are three types of values an argument can take this figures out which one
# we have so we know how to proceed
argument_expr_type <- function(x) {
  if (!is.call(x)) {
    "constant"
  } else if (is_known_ui_fn(x)) {
    "ui-fn"
  } else {
    "unknown-fn"
  }
}


str_replace_all <- function(text, pattern, replacement, fixed = FALSE){
  gsub(pattern = pattern, replacement = replacement, x = text, perl = !fixed, fixed = fixed)
}

str_remove <- function(text, pattern, fixed = FALSE){
  gsub(pattern = pattern, replacement = "", x = text, perl = !fixed, fixed = fixed)
}

indent_text <- function(text, num_spaces = 2) {

  # If we have a single length vector, assume it needs to be split on new-lines
  if (length(text) == 1) {
    text <- strsplit(
      text,
      split = "\n"
    )[[1]]
  }

  text <- if (num_spaces > 0) {
    paste0(
      paste(rep(" ", times = num_spaces), collapse = ""),
      text
    )
  } else {
    str_replace_all(
      text,
      pattern = paste0("^(\\s{1,", abs(num_spaces), "})"),
      replacement = ""
    )
  }

  paste(text, collapse = "\n")
}

# Via https://stackoverflow.com/questions/10022436/do-call-in-combination-with
do_call_namespaced <- function(what, args, ...){
  if(is.function(what)){
    what <- deparse(as.list(match.call())$what);
  }
  myfuncall <- parse(text=what)[[1]];
  mycall <- as.call(c(list(myfuncall), args));
  eval(mycall, ...);
}



# Wrap a single line of text in an ascii character box to draw attention to it
ascii_box <- function(msg){
  horizontal_line <- paste(rep("-", nchar(msg)+2), collapse = "")
  vertical_line <- "|"

  paste0(
    "\u250C", horizontal_line, "\u2510\n",
    vertical_line, " ", msg, " ", vertical_line, "\n",
    "\u2514", horizontal_line, "\u2518\n"
  )
}

