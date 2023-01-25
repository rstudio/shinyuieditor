devtools::load_all(".")
launch_editor(
  app_loc =  here::here("scratch/single-file-app/"),
  port = 8888,
  launch_browser = FALSE,
  stop_on_browser_close = FALSE
)

# ui_expr <- rlang::expr(
#   gridlayout::grid_page(
#     layout = c(
#       "A B",
#       "C D"
#     ),
#     row_sizes = c(
#       "120px",
#       "1fr"
#     ),
#     col_sizes = c(
#       "505px",
#       "1fr"
#     ),
#     gap_size = "1rem",
#     gridlayout::grid_card(area = "A"),
#     gridlayout::grid_card_text(area = "B", content = "B"),
#     gridlayout::grid_card(area = "C"),
#     gridlayout::grid_card_plot(area = "D")
#   )
# )

# lobstr::tree(shinyuieditor:::ui_code_to_tree(ui_expr))