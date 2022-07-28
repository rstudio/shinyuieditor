# Makes sure that there is an app where there's supposed to be and offers to
# fill in any missing components if they exist. If missing components are
# refused then the function returns that the app is not valid and message about
# why. stop()'s are used from internal functions to pass these reasons.
check_and_validate_app <- function(app_loc) {

  # We bubble up the reason for a non-valid app via throwing errors, hence the
  # tryCatch
  tryCatch(
    {
      # Check and make sure that the app location provided actually has an app
      app_type <- get_app_type(app_loc)

      if (app_type == "multi-file") {
        # Validate and optionally fill in server and ui
        check_server_file(app_loc)
        check_ui_file(app_loc)
      }

      if (app_type == "missing") {
        # If no ui.R or server.R is present in location, let the user choose from
        # some templates
        fill_in_app_template(app_loc)
      }

      list(is_valid = TRUE)
    },
    error = function(e) {
      list(
        is_valid = FALSE,
        message = e$message
      )
    }
  )
}




check_server_file <- function(app_loc) {
  # Does the server.R file exist?
  app_server_path <- fs::path(app_loc, "server.R")
  has_server_file <- fs::file_exists(app_server_path)

  if (!has_server_file) {
    ask_to_continue(
      "No server.R file was found in app directory. ",
      "Would you like an empty one created and added?",
      reason_if_no = "No server.R present"
    )

    add_server_template("empty", app_loc)
  }
}

check_ui_file <- function(app_loc) {
  # Does the ui file exist?
  has_ui_file <- has_app_file(app_loc, "ui.R")

  if (!has_ui_file) {
    ask_to_continue(
      "No ui.R was found. ",
      "Would you like an empty one created and added?",
      reason_if_no = "No ui.R present"
    )

    add_ui_template("empty", app_loc)
    return()
  }

  # Make sure the ui is actually valid
  is_parsable_ui <- tryCatch(
    {
      source(fs::path(app_loc, "ui.R"))
      TRUE
    },
    error = function(e) {
      cat(crayon::red("Failed to start app editor: app UI definition invalid: \n"))
      # stop(e)
      FALSE
    }
  )

  if (is_parsable_ui) {
    return()
  }

  ask_to_continue(
    "Current ui.R is not able to be parsed: sorry! ",
    "Would you like to add a new ui.R for use with your existing server? ",
    "(Don't worry, the existing ui will be kept as ui.backup.R.)",
    reason_if_no = "Can't parse ui.R"
  )

  add_ui_template("empty", app_loc)
}



has_app_file <- function(app_loc, file) {
  fs::file_exists(fs::path(app_loc, file))
}


get_app_type <- function(app_loc) {
  if (has_app_file(app_loc, "app.R")) {
    return("single-file")
  }

  if (has_app_file(app_loc, "ui.R") || has_app_file(app_loc, "server.R")) {
    return("multi-file")
  }

  return("missing")
}

end_early <- function(reason = "No app to run") {
  # print("Ending early")
  stop(reason, call. = FALSE)
}

ask_to_continue <- function(..., reason_if_no = "No app to run") {
  res <- ask_question(
    ...,
    answers = c("yes", "no")
  )

  if (!identical(res, "yes")) {
    end_early(reason_if_no)
  }
}
