# All available templates as found in inst/app-templates
single_file_templates <- c("geyser single-file", "chick weights")
multi_file_templates <- c("geyser")

starter_templates <- c(multi_file_templates, single_file_templates)

fill_in_app_template <- function(app_loc) {
  ask_to_continue(
    "No app was found at location ",
    app_loc, ".\n",
    "Would you like to start a new app from a template?"
  )

  chosen_template <- ask_question(
    "Which starter template would you like to use? ",
    "(Sorry, it's an easy choice currently.)",
    answers = starter_templates
  )

  if (identical(chosen_template, character(0L))) {
    end_early()
  }


  # Make sure the directory exists
  fs::dir_create(app_loc)

  if (chosen_template %in% single_file_templates) {
    add_single_file_template(chosen_template, app_loc)
  } else {
    add_server_template(chosen_template, app_loc)
    add_ui_template(chosen_template, app_loc)
  }
}



get_path_to_template <- function(template_name) {
  if (!template_name %in% c(starter_templates, "empty")) {
    stop("Unknown template: ", template_name)
  }

  # Convert any spaces to underscores to get the proper path
  template_name <- gsub(" ", replacement = "_", x = template_name)


  system.file(paste0("app-templates/", template_name), package = "shinyuieditor")
}


add_server_template <- function(template_name, app_loc) {
  fs::file_copy(
    fs::path(get_path_to_template(template_name), "server.R"),
    fs::path(app_loc, "server.R")
  )
}

add_ui_template <- function(template_name, app_loc) {
  app_ui_path <- fs::path(app_loc, "ui.R")
  has_ui_file <- fs::file_exists(app_ui_path)

  if (has_ui_file) {
    cat("Moving existing ui.R to ui.backup.R\n")
    fs::file_move(
      app_ui_path,
      fs::path(app_loc, "ui.backup.R")
    )
  }

  fs::file_copy(
    fs::path(get_path_to_template(template_name), "ui.R"),
    app_ui_path
  )
}

add_single_file_template <- function(template_name, app_loc) {
  app_file_path <- fs::path(app_loc, "app.R")
  has_app_file <- fs::file_exists(app_file_path)

  if (has_app_file) {
    cat("Moving existing app.R to app.backup.R\n")
    fs::file_move(
      app_file_path,
      fs::path(app_loc, "app.backup.R")
    )
  }

  fs::file_copy(
    fs::path(get_path_to_template(template_name), "app.R"),
    app_file_path
  )
}
