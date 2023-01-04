devtools::load_all(".")
library(lobstr)
# launch_editor(
#   app_loc =  here::here("scratch/single-file-app/"),
#   port = 8888,
#   launch_browser = FALSE,
#   stop_on_browser_close = FALSE
# )


file_lines <- readLines("scratch/single-file-app/app.R")
parsed <- parse(text = file_lines, keep.source = TRUE)


ui_expr <- rlang::expr(
  gridlayout::grid_page(
    layout = c(
      "A B",
      "C D"
    ),
    row_sizes = c(
      "120px",
      "1fr"
    ),
    col_sizes = c(
      "505px",
      "1fr"
    ),
    gap_size = "1rem",
    gridlayout::grid_card(area = "A"),
    gridlayout::grid_card_text(area = "B", content = "B"),
    gridlayout::grid_card(area = "C"),
    gridlayout::grid_card_plot(area = "D")
  )
)

f <- function(a) {
  a * 2
}

# serialize_ast(f)

fn_expr <- rlang::expr(
  function(a, b = 2) {
    a + b
  }
)
serialize_ast(fn_expr)

# full_ast <- serialize_ast(parsed)
# jsonlite::toJSON(full_ast, auto_unbox = TRUE)
# full_ast
# tree(full_ast)
