#' Get info about Shiny app for editor
#'
#' Gets pointed at an app containing directory and returns one of two
#' datastructures depending on if it's a single- or multi-file app.
#'
#' @param app_loc Path the the app location
#'
#' @return If it's a
#' single file app its a list with `app_type = "SINGLE-FILE"` and a property
#' `app` that contains `script` (the raw file text for `app.R`) and `ast` which
#' is the serialized ast for that script.
#'
#' If it's a multi-file app its `type="MULTI-FILE` and `ui`  and `server`
#' properties with the same script + ast combo as `app` in the single-file case
#'
#' @keywords internal
#'
get_app_info <- function(app_loc) {
  app_type <- get_app_file_type(app_loc)

  if (identical(app_type, "SINGLE-FILE")) {
    list(
      app_type = "SINGLE-FILE",
      app = parse_app_script(fs::path(app_loc, "app.R"))
    )
  } else {
    list(
      app_type = "MULTI-FILE",
      ui = parse_app_script(fs::path(app_loc, "ui.R")),
      server = parse_app_script(fs::path(app_loc, "server.R"))
    )
  }
}

parse_app_script <- function(script_loc) {
  file_lines <- readLines(script_loc)
  parsed <- parse(text = file_lines, keep.source = TRUE)

  list(
    script = paste(file_lines, collapse = "\n"),
    ast = serialize_ast(parsed)
  )
}

get_app_scripts <- function(app_loc) {
  app_type <- get_app_file_type(app_loc)

  if (identical(app_type, "SINGLE-FILE")) {
    list(
      language = "R",
      app_type = "SINGLE-FILE",
      app = get_script(fs::path(app_loc, "app.R"))
    )
  } else {
    list(
      language = "R",
      app_type = "MULTI-FILE",
      ui = get_script(fs::path(app_loc, "ui.R")),
      server = get_script(fs::path(app_loc, "server.R"))
    )
  }
}


get_script <- function(script_loc) {
  file_lines <- readLines(script_loc)
  # parsed <- parse(text = file_lines, keep.source = TRUE)

  paste(file_lines, collapse = "\n")
}
