library(jsonlite)



ui_tree |> generate_ui_code()

ui_tree |> lobstr::tree()
ui_tree |> simplify_tree() |> lobstr::tree()

ui_tree |>
  simplify_tree() |>
  tree_to_exp() |>
  rlang::expr_text() |>
  str_replace_all(
    pattern="),",
    replacement="),\n",
    fixed=TRUE
  ) |>
  str_replace_all(
    pattern=", ",
    replacement=",\n",
    fixed=TRUE
  ) |>
  styler::style_text(scope = "tokens") |>
  cat()


styler::style_text(rlang::expr_text(ui_call))
install.packages("prettycode")

ui_call |> rlang::expr_text(width = 80L) |> cat()

?rlang::expr_text

cat(ui_call)
ui_tree


library(glue)


glue(
  "{ui_tree$ui_tree}"
  )
ui_tree |> lobstr::tree()
parsed_dump <- jsonlite::parse_json(app_dump)
lobstr::tree(parsed_dump)

cat(to_gridlayout_ui(parsed_dump))

