
test_that("Validate path to app script, or to folder container app", {
  
  expect_equal(
    validate_app_loc("my/app/loc/app.R"),
    validate_app_loc("my/app/loc")
  )

  expect_equal(
    validate_app_loc("my/app/loc/ui.R"),
    validate_app_loc("my/app/loc")
  )
})
