# Options for starting
# 1. Path to app is empty
# 2. Path to app exists
#   1. Doesn't have server file
#
#   1. Has full (app.r and server.R)
#     1. app.R doesn't parse
#     2. app.R parses
check_and_validate_app <- function(app_loc){
  # Options for starting

  # Check and make sure that the app location provided actually has an app
  has_existing_app <- get_app_exists(app_loc)

  if (has_existing_app){
    # Validate and optionaly fill in server and ui
    check_server_file(app_loc)
    check_ui_file(app_loc)

  } else {
    # If no ui.R or server.R is present in location, let the user choose from
    # some templates
    fill_in_app_template(app_loc)
  }
}



fill_in_app_template <- function(app_loc){
  ask_to_continue(
    "No app was found at location ",
    app_loc, ".\n",
    "Would you like to start a new app from a template?"
  )

  starter_templates <- c("geyser")

  chosen_template <- ask_question(
    "Which starter template would you like to use?",
    answers = starter_templates
  )

  if (identical(chosen_template, character(0L))){
    exit_early()
  }

  # Make sure the directory exists
  fs::dir_create(app_loc)

  template_loc <- system.file(paste0("app-templates/", chosen_template), package = "ShinyUiEditor")

  add_server_template(
    fs::path(template_loc, "server.R"),
    app_loc
  )
  add_ui_template(
    fs::path(template_loc, "ui.R"),
    app_loc
  )
}

add_server_template <- function(server_template_loc, app_loc){
  fs::file_copy(server_template_loc, fs::path(app_loc, "server.R"))
}

add_ui_template <- function(ui_template_loc, app_loc){
  app_ui_path <- fs::path(app_loc, "ui.R")
  has_ui_file <- fs::file_exists(app_ui_path)

  if (has_ui_file){
    cat("Moving existing ui.R to ui.backup.R\n")
    fs::file_move(
      app_ui_path,
      fs::path(app_loc, "ui.backup.R")
    )
  }

  fs::file_copy(ui_template_loc, app_ui_path)
}

add_empty_ui <- function(app_loc){
  empty_ui_template <- system.file("app-templates/empty_ui.R", package = "ShinyUiEditor")
  add_ui_template(empty_ui_template, app_loc)
}

check_server_file <- function(app_loc){
  # Does the server.R file exist?
  app_server_path <- fs::path(app_loc, "server.R")
  has_server_file <- fs::file_exists(app_server_path)

  if (!has_server_file){
    ask_to_continue(
      "No server.R file was found in app directory. ",
      "Would you like an empty one created and added?"
    )

    empty_server <- system.file("app-templates/empty_server.R", package = "ShinyUiEditor")
    add_server_template(empty_server, app_loc)
  }

  TRUE
}

check_ui_file <- function(app_loc){
  # Does the ui file exist?
  has_ui_file <- get_has_ui_file(app_loc)

  if (!has_ui_file){
    ask_to_continue(
      "No ui.R was found. ",
      "Would you like an empty one created and added?"
    )

    add_empty_ui(app_loc)
    return(TRUE)
  }

  # Make sure the ui is actually valid
  is_parsable_ui <- tryCatch({
    source(get_app_ui_file(app_loc))
    TRUE
  }, error = function(e){
    cat(crayon::red("Failed to start app editor: app UI definition invalid: \n"))
    # stop(e)
    FALSE
  })

  if (is_parsable_ui) { return(TRUE) }

  ask_to_continue(
    "Current ui.R is not able to be parsed: sorry! ",
    "Would you like to add a new ui.R for use with your existing server? ",
    "(Don't worry, the existing ui will be kept as ui.backup.R.)"
  )

  add_empty_ui(app_loc)

  return(TRUE)
}

get_has_ui_file <- function(app_loc){
  app_ui_path <- fs::path(app_loc, "ui.R")
  fs::file_exists(app_ui_path)
}

get_has_server_file <- function(app_loc){
  app_server_path <- fs::path(app_loc, "server.R")
  fs::file_exists(app_server_path)
}

get_app_exists <- function(app_loc){
  has_ui_file <- get_has_ui_file(app_loc)
  has_server_file <- get_has_server_file(app_loc)

  # An app exists if either the ui.R or server.R or both are present
  has_ui_file | has_server_file
}

end_early <- function(){
  print("Ending early")
  stop("Exiting launcher", call. = FALSE)
}

ask_to_continue <- function(...){
  res <- ask_question(
    ...,
    answers = c('yes', "no")
  )

  if (!identical(res, 'yes')) {
    end_early()
  }

}
