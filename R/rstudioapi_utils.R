# Convert the format provided by treesitter/ the js client to one usable by the
# rstudio api for highlighting code on the server
client_loc_to_rstudioapi_range <- function(location) {

  # Convert positions to the 1-indexed format used by the rstudioapi
  selection_start <- rstudioapi::document_position(
    row = location$start$row + 1,
    column = location$start$column + 1
  )

  selection_end <- rstudioapi::document_position(
    row = location$end$row + 1,
    column = location$end$column + 1
  )

  rstudioapi::document_range(
    start = selection_start,
    end = selection_end
  )
}


#' Select the code for the given app location based on client-side locations
#' 
#' @param locations Locations of the code to be selected in the client
#' @param app_loc Path to directory containing Shiny app to be visually edited
#' (either containing an `app.R` or both a `ui.R` and `server.R`).
#' @param app_type Type of app to get the server script for. Can be
#' "SINGLE-FILE" or "MULTI-FILE". As returned by `get_app_file_type()`
#' 
#' @keywords internal
select_server_code <- function(locations, app_loc, app_type) {

    # Make sure the server-containing script is the main active file it's
    # in the right file incase the user has navigated away 
    rstudioapi::navigateToFile(
        file = get_path_to_app_server_script(app_type, app_loc)
    )
    
    ranges <- lapply(
        X = locations, 
        FUN = client_loc_to_rstudioapi_range 
    )
    rstudioapi::setSelectionRanges(ranges = ranges)
}


#' Get path of the app server script (either `app.R` or `server.R`)
#' 
#' @param app_type Type of app to get the server script for. Can be
#' "SINGLE-FILE" or "MULTI-FILE". As returned by `get_app_file_type()`
#' @param app_loc Path to directory containing Shiny app to be visually edited
#'  (either containing an `app.R` or both a `ui.R` and `server.R`). 
#'
#' @keywords internal
#' 
get_path_to_app_server_script <- function(app_type, app_loc) {
  if (identical(app_type, "SINGLE-FILE")) {
    return(fs::path(app_loc, "app.R"))
  }
  if (identical(app_type, "MULTI-FILE")) {
    return(fs::path(app_loc, "server.R"))
  }
}


