# All available templates as found in inst/app-templates
gather_starter_templates <- function(){

  all_template_dirs <- vapply(
    fs::dir_ls(fs::path_package("shinyuieditor", "app-templates/")),
    fs::path_file,
    FUN.VALUE = character(1L),
    USE.NAMES = FALSE
  )

  all_template_dirs <- all_template_dirs[all_template_dirs != "empty"]

  all_templates <- lapply(
    all_template_dirs,
    FUN = function(dir) {
      list(
        multi_file = grepl(
          x = dir,
          pattern = "multi-file",
          fixed = TRUE
        ),
        dir = dir
      )
    }
  )

  names(all_templates) <- str_replace_all(
    text = all_template_dirs,
    pattern = "_", replacement = " ", fixed = TRUE
  )

  all_templates
}

fill_in_app_template <- function(app_loc) {
  ask_to_continue(
    "No app was found at location ",
    app_loc, ".\n",
    "Would you like to start a new app from a template?"
  )

  templates <- gather_starter_templates()
  chosen_template <- ask_question(
    "Which starter template would you like to use? ",
    "(Note: \"chick weights\" template uses ggplot2 for plotting)",
    answers = names(templates)
  )

  if (identical(chosen_template, character(0L))) {
    end_early()
  }

  # Make sure the directory exists
  fs::dir_create(app_loc)

  chosen_is_multi_file <- templates[[chosen_template]]$multi_file
  chosen_dir <- templates[[chosen_template]]$dir
  if (chosen_is_multi_file) {
    add_server_template(chosen_dir, app_loc)
    add_ui_template(chosen_dir, app_loc)
  } else {
    add_single_file_template(chosen_dir, app_loc)
  }
}



get_path_to_template <- function(template_name) {
  if (!fs::file_exists(
    fs::path_package("shinyuieditor", "app-templates/", template_name)
  )) {
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
