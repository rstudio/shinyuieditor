
test_that("Can fill in unnamed named arguments", {
  ui_expr <- rlang::expr({
    library(gridlayout)
    grid_card_text("myArea", content = "B")
  })

  serialized <- serialize_ast(ui_expr)

  grid_card_name_arg <- serialized[[3]]$val[[2]]
  expect_equal(
    grid_card_name_arg$name,
    "area"
  )
  expect_equal(
    grid_card_name_arg$val,
    "myArea"
  )
})


test_that("Can handle functions declared in scope. E.g. reactives.", {
  expr_with_fn_declaration <- rlang::expr(
    {
      my_fn <- function(name) paste("hello", name)
      my_fn("shiny")
    }
  )

  serialized <- serialize_ast(expr_with_fn_declaration)

  my_fn_call <- serialized[[3]]

  expect_equal(
    my_fn_call$val,
    list(
      list(val="my_fn", type="s"),
      list(val="shiny", type="c")
    )

  )
})
