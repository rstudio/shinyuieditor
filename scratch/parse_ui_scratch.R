
library(gridlayout)

ui_expr <- rlang::expr(
  gridlayout::grid_page(
    layout = "
    |2rem  |200px   |1fr    |
    |80px  |header  |header |
    |1fr   |sidebar |plot   |",
    gridlayout::title_panel(
      "header",
      title = "My App Title from R2"
    ),
    gridlayout::grid_panel(
      "sidebar",
      shiny::sliderInput(inputId="slider1", label="my slider is cool", min="1", max="10", value="7"),
      shiny::sliderInput(inputId="slider3", min="2", max="10", value="5")
    ),
    gridlayout::grid_panel(
      "plot",
      shiny::plotOutput("distPlot")
    )
    # lapply(
    #   c(1,2,3),
    #   FUN=function(x){x}
    # )
  )
)

ui_expr |> parse_ui_fn() |> lobstr::tree()

ui_expr |> parse_ui_fn() |> update_ui_nodes() |> lobstr::tree()
lobstr::tree(gridlayout_node)




updated_gl_node <- update_ui_nodes(gridlayout_node)

updated_gl_node |> lobstr::tree()



parse_gridlayout(gridlayout_node) |> lobstr::tree()
