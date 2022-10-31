# Helper functions related to file paths and apps


# Convert a app file type from abstract name to R specific file name
file_type_to_name <- list(
  "app" = "app.r",
  "ui" = "ui.r",
  "server" = "server.r"
)



#' Get the file defining the ui for a shiny app directory
#'
#' @param app_loc Path to a shiny app @param error_on_missing Should the lack of
#' app ui file trigger an error? If not returns a type of "missing" and no path
#'
#' @return Path to either the `app.R` file in directory in the case of
#'   single-file apps, or `ui.R` in the case of multi-file apps. If both exist
#'   then `app.R` will take precedence
#'
#' @keywords internal
#'
get_app_ui_file <- function(app_loc, error_on_missing = FALSE) {

  if (fs::file_exists(fs::path(app_loc, "app.r"))) {
    return(
      list(path = fs::path(app_loc, "app.r"), type = "single-file")
    )
  }
  if (fs::file_exists(fs::path(app_loc, "app.R"))) {
    return(
      list(path = fs::path(app_loc, "app.R"), type = "single-file")
    )
  }
  

  if (fs::file_exists(fs::path(app_loc, "ui.r"))) {
    return(
      list(path = fs::path(app_loc, "ui.r"), type = "multi-file")
    )
  }
  if (fs::file_exists(fs::path(app_loc, "ui.R"))) {
    return(
      list(path = fs::path(app_loc, "ui.R"), type = "multi-file")
    )
  }

  if (error_on_missing) {
    stop(
      "Can't find an app.R or ui.R file in the provided app_loc. ",
      "Make sure your working directory is properly set"
    )
  }

  list(type = "missing")
}



#' Write app script to a file
#'
#' @param app_lines Character vector containing the code for the given script.
#'   Will be concatinated with new lines
#' @param app_loc Location of folder where script will be written to
#' @param file_type Type of file being written. Can either be "app" for writing
#'   an "app.R", or "ui"/"server" for writing the two scripts of a multi-file
#'   app.
#'
#' @return NULL
#' @keywords internal
write_app_file <- function(app_lines, app_loc, file_type) {

  # Ensure the path to the app is valid
  app_file_path <- fs::file_create(
    fs::dir_create(app_loc), 
    file_type_to_name[file_type]
  )

  writeLines(
    text = app_lines,
    con = app_file_path
  )
}

remove_app_file <- function(app_loc, file_type) {
  fs::file_delete(fs::path(app_loc, file_type_to_name[file_type]))
}
