
test_that("Handles being passed path directly to app script, or to folder container app", {
  
  expect_equal(
    validateAppLoc("my/app/loc/app.R"),
    validateAppLoc("my/app/loc")
  )
  
  expect_equal(
    validateAppLoc("my/app/loc/ui.R"),
    validateAppLoc("my/app/loc")
  )
})
