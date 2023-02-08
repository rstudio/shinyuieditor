# Helper functions related to file paths and apps



# Convert a app file type from abstract name to R specific file name
file_type_to_ui_script <- list(
  "SINGLE-FILE" = "app.R",
  "MULTI-FILE" = "ui.R"
)

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


remove_app_template <- function(app_loc) {

  app_type <- get_app_file_type(app_loc)

  switch(
    app_type,
    "SINGLE-FILE" = {
      fs::file_delete(fs::path(app_loc, "app.R"))
    },
    "MULTI-FILE" = {
      fs::file_delete(fs::path(app_loc, "ui.R"))
      fs::file_delete(fs::path(app_loc, "server.R"))
    }, 
    "MISSING" = {
      # If the app type is "MISSING" this means we never added anything so
      # there's nothing to remove
    },
    {
      stop(paste("Improper specification of template app output: ", app_type))
    }
  )
  
  app_loc_now_empty <- identical(length(fs::dir_ls(app_loc)), 0L)
  app_loc_is_cwd <- identical(app_loc, ".") || identical(getwd(), app_loc)

  if (app_loc_now_empty && !app_loc_is_cwd) {
    fs::dir_delete(app_loc)
  }
}
