#' Get the file type a shiny app directory
#' 
#' Also checks for multifile apps and emits a depreciation error
#'
#' @param app_loc Path to a shiny app
#' @param error_on_missing Should the lack of
#' app ui file trigger an error? If not returns a type of "missing" and no path
#'
#' @return either `TRUE` if it finds an (`app.R`) or `FALSE` if no app detected
#'
#' @keywords internal
#'
check_for_app_file <- function(app_loc, error_on_missing = FALSE) {
  if (
    fs::file_exists(fs::path(app_loc, "app.r")) ||
      fs::file_exists(fs::path(app_loc, "app.R"))
  ) {
    return(TRUE)
  }

  if (
    fs::file_exists(fs::path(app_loc, "ui.r")) ||
      fs::file_exists(fs::path(app_loc, "ui.R"))
  ) {
    multifile_depreciation_error()
  }

  if (error_on_missing) {
    stop(
      "Can't find an app.R file in the provided app_loc. ",
      "Make sure your working directory is properly set"
    )
  }

  return(FALSE)

 
}


get_app_scripts <- function(app_loc) {
  
    list(
      language = "R",
      app = get_script(fs::path(app_loc, "app.R"))
    )

  
}


get_script <- function(script_loc) {
  file_lines <- readLines(script_loc)
  paste(file_lines, collapse = "\n")
}


multifile_depreciation_error <- function() {
  stop(
    "Support for multifile apps in the UI editor has been depreciated. ",
    "Please use a single file app. Sorry for the inconvenience!"
  )
}