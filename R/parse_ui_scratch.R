
ui_expr <- rlang::expr(
  grid_page(
    layout = "
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |",
    header = title_panel("This is my header"),
    plot = plotOutput("distPlot")
  )
)

gridlayout_node <- parse_ui_fn(ui_expr)
lobstr::tree(gridlayout_node)

parse_gridlayout(gridlayout_node) %>% lobstr::tree()
