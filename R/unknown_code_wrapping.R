
# When we can't parse a bit of the UI we place it into an unknown box that will
# be preserved in both parsing and un-parsing
unknown_code_wrap <- function(code_expr) {
  list(
    uiName = "unknownUiFunction",
    uiArguments = list(
      text = rlang::expr_text(code_expr)
    )
  )
}

unknown_code_unwrap <- function(unknown_code_box){
  # TODO: Replace with a more portable function
  str2lang(unknown_code_box$uiArguments$text)
}

is_unknown_code <- function(ui_node){
  is.list(ui_node) && identical(ui_node$uiName, "unknownUiFunction")
}
