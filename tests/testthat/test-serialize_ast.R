
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
