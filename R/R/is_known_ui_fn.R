#' Is a function call a known UI function call?
#'
#' Takes an AST node and tells us if it corresponds to a known UI function call.
#' Makes the assumption that we can't look into the environment to make sure
#' that we are getting the function we think we are. This is because we want to
#' be able to parse raw text instead of relying on an active evaluation context.
#'
#' @param x Language object node corresponding to a function call
#'
#' @return Boolean
#' @export
#'
#' @examples
#'
#' is_known_ui_fn(rlang::expr(gridlayout::grid_page()))
#' is_known_ui_fn(rlang::expr(custom_ui_page()))
#'
is_known_ui_fn <- function(x){

  if (!is.language(x)) stop("Passed value is not an expression")

  if (is.symbol(x) || identical(x[[1]], as.symbol("::"))) stop("Passed expression is not a function call")

  full_uiName <- called_uiName(x)

  # if (identical(full_uiName, "::")) stop("Passed expression is not a function call")
  # Get rid of the namespace prefix so we can look up functions more easily.
  # Ideally all calls would have namespace prefix so we can be sure we're
  # getting what we think instead of a user defined variable but that's a
  # pretty hefty restriction

  fn_list <- if (grepl("::", full_uiName, fixed = TRUE)) namespaced_ui_fns else known_ui_fns

  full_uiName %in% fn_list
}


namespaced_ui_fns <- c(
  "gridlayout::grid_page",
  "gridlayout::title_panel",
  "gridlayout::grid_panel",
  "shiny::sliderInput",
  "shiny::plotOutput"
)
known_ui_fns <- gsub(pattern = "\\w+::", replacement = "", x = namespaced_ui_fns, perl = TRUE)

