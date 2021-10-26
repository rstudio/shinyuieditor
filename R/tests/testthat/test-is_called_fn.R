test_that("works in basic cases", {

  expect_true(is_called_fn(rlang::expr(grid_page())))
  expect_false(is_called_fn(rlang::expr(grid_page)))
  expect_false(is_called_fn(rlang::expr(4)))
})

test_that("Handles namespaces", {
  expect_true(is_called_fn(rlang::expr(gridlayout::grid_page())))
  expect_false(is_called_fn(rlang::expr(gridlayout::grid_page)))
})

test_that("Doesn't evaluate functions", {
  expect_true(
    is_called_fn(
      rlang::expr(
        my_custom_fn()
      )
    )
  )
  expect_true(
    is_called_fn(
      rlang::expr(
        my_pkg::my_custom_fn()
      )
    )
  )

  expect_false(
    is_called_fn(
      rlang::expr(
        my_custom_fn
      )
    )
  )
  expect_false(
    is_called_fn(
      rlang::expr(
        my_pkg::my_custom_fn
      )
    )
  )

})
