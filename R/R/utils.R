
# Pull out name of call from an AST node in plain text
called_fn_name <- function(x) {
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
