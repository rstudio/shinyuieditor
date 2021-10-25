# The geyser app... but in grid!

library(gridlayout)
library(shiny)

expr_type <- function(x) {
  if (rlang::is_syntactic_literal(x)) {
    "constant"
  } else if (is.symbol(x)) {
    "symbol"
  } else if (is.call(x)) {
    "call"
  } else if (is.pairlist(x)) {
    "pairlist"
  } else {
    typeof(x)
  }
}
my_layout <- new_gridlayout("
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |")


app_expr <- rlang::expr(
  grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    header = title_panel("This is my header"),
    sidebar = grid_panel(
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    plot = plotOutput("distPlot")
  )
)


parse_ui_fn <- function(ui_expr){
  if (!is.language(ui_expr)) stop('parse_ui_fn() was passed a non-language object')

  expr_list <- as.list(ui_expr)

  parsed <- list(
    fn_name = as.character(expr_list[[1]])
  )
  num_args <- length(expr_list) - 1

  if (num_args > 0) {
    parsed$args <- list()

    for(i in 1:num_args){
      # Add one because first element is calling fn
      arg_i <- i + 1
      arg_info <- list()

      arg_name <- names(expr_list)[[arg_i]]
      if (!is.null(arg_name) && arg_name != "") arg_info$name <- arg_name

      arg_info$type <- expr_type(expr_list[[arg_i]])

      arg_info$value <- if (arg_info$type == "call"){
        parse_ui_fn(expr_list[[arg_i]])
      } else {
        as.character(expr_list[[arg_i]])
      }

      parsed$args[[i]] <- arg_info
    }
  }

  parsed
}


lobstr::tree(parse_ui_fn(app_expr))

