#' Is a function call a known UI function call?
#'
#' Takes an AST node and tells us if it corresponds to a known UI function call.
#' Makes the assumption that we can't look into the environment to make sure
#' that we are getting the function we think we are. This is because we want to
#' be able to parse raw text instead of relying on an active evaulation context.
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
  if (!is_called_fn(x)) stop("Passed value is a not a function call object")

  sanatize_fn_name(called_fn_name(x)) %in% known_ui_fns
}


# Get rid of the namespace prefix so we can look up functions more easily.
# Ideally all calls would have namespace prefix so we can be sure we're
# getting what we think instead of a user defined variable but that's a
# pretty hefty restriction
sanatize_fn_name <- function(fn_name) {
  gsub(pattern = "\\w+::", replacement = "", x = fn_name, perl = TRUE)
}


known_ui_fns <- c(
  "grid_page",
  "title_panel",
  "grid_panel",
  "sliderInput",
  "plotOutput"
)

