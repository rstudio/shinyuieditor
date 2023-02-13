#' Get the file type a shiny app directory
#'
#' @param app_loc Path to a shiny app
#' @param error_on_missing Should the lack of
#' app ui file trigger an error? If not returns a type of "missing" and no path
#'
#' @return either "SINGLE-FILE" (`app.R``), "MULTI-FILE" (`ui.R` and
#' `server.R`), or "MISSING" (empty directory)
#'
#' @keywords internal
#'
get_app_file_type <- function(app_loc, error_on_missing = FALSE) {
  if (
    fs::file_exists(fs::path(app_loc, "app.r")) ||
      fs::file_exists(fs::path(app_loc, "app.R"))
  ) {
    return("SINGLE-FILE")
  }

  if (
    fs::file_exists(fs::path(app_loc, "ui.r")) ||
      fs::file_exists(fs::path(app_loc, "ui.R"))
  ) {
    return("MULTI-FILE")
  }

  if (error_on_missing) {
    stop(
      "Can't find an app.R or ui.R file in the provided app_loc. ",
      "Make sure your working directory is properly set"
    )
  }

  "MISSING"
}

app_type_to_files <- list(
  "SINGLE-FILE" = "app.R",
  "MULTI-FILE" = c("ui.R", "server.R")
)
