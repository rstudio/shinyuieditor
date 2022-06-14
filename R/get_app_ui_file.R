#' Get the file defining the ui for a shiny app directory
#'
#' @param app_loc Path to a shiny app
#'
#' @return Path to either the `app.R` file in directory in the case of
#'   single-file apps, or `ui.R` in the case of multi-file apps. If both exist
#'   then `app.R` will take precedence
#'
get_app_ui_file <- function(app_loc) {
  # We first try and look for a single app file
  single_file_app_script <- fs::path(app_loc, "app.R")

  if (fs::file_exists(single_file_app_script)) {
    return(
      list(path = single_file_app_script, type = "single-file")
    )
  }


  plain_ui_file <- fs::path(app_loc, "ui.R")

  if (fs::file_exists(plain_ui_file)) {
    return(
      list(path = plain_ui_file, type = "multi-file")
    )
  }

  stop(
    "Can't find an app.R or ui.R file in the provided app_loc. ",
    "Make sure your working directory is properly set"
  )
}
