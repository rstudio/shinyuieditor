#' Get app ui information from script
#'
#' @param file_lines Character vector of the lines of the file that defines a
#'   shiny app's ui (as from `readLines()`).
#' @param type Is the app a SINGLE-FILE app? E.g. app is container entirely in
#'   `app.R`? Or is it `MULTI-FILE`?
#'
#'
#' @return List with both the `type` and `file_lines` mirrored from the
#'   arguments of the same name. Along with this the `ui_bounds` containing the
#'   start and end lines of the file section that defines the app's ui, the
#'   `ui_tree` IR that defines that ui, and `loaded_libraries`: libraries loaded
#'   via `library()` calls in the script.
#'
#'
#' @examples
#'
#' # Note the use of the triple colon, this function is not exported
#' # shinyuieditor:::get_file_ui_definition_info(...)
#'
#' # Can handle single-file app.R
#' app_loc <- system.file(
#'   "app-templates/geyser/app.R",
#'   package = "shinyuieditor"
#'  )
#' shinyuieditor:::get_file_ui_definition_info(readLines(app_loc), type = "SINGLE-FILE")
#'
#' # Also handles multi-file apps
#' app_loc <- system.file("app-templates/geyser_multi-file/ui.R", package = "shinyuieditor")
#' shinyuieditor:::get_file_ui_definition_info(readLines(app_loc), type = "MULTI-FILE")
#'
get_file_ui_definition_info <- function(file_lines, type = "SINGLE-FILE") {
  parsed <- parse(text = file_lines, keep.source = TRUE)

  idx <- 0
  if (type == "SINGLE-FILE") {
    for (i in seq_len(length(parsed))) {
      node <- parsed[[i]]
      if (inherits(node, "<-") && identical(node[[2]], as.name("ui"))) {
        idx <- i
        break
      }
    }

    if (idx == 0) {
      return(NULL)
    }

    # Pluck out the expression for the ui for parsing into the IR. Since the
    # expression is an assignment we need to get the third element of the AST
    # to get the actual ui definition
    ui_expr <- parsed[[idx]][[3]]
  } else if (type == "MULTI-FILE"){
    # Last node in parsed file should be the ui definition
    idx <- length(parsed)
    ui_expr <- parsed[[idx]]
  } else {
    stop("Unknown app type", type, "Options include \"SINGLE-FILE\" and \"MULTI-FILE\"")
  }

  ui_srcref <- attr(parsed, "srcref")[[idx]]

  loaded_libraries <- get_loaded_libraries(file_lines)
  list(
    type = type,
    file_lines = file_lines,
    ui_bounds = list(
      start = ui_srcref[[1]],
      end = ui_srcref[[3]]
    ),
    ui_tree = ui_code_to_tree(ui_expr, loaded_libraries),
    loaded_libraries = loaded_libraries
  )
}

#' Grab libraries loaded via library() calls
#'
#' Gather the name of all libraries loaded with calls to `library()` in a given
#' app
#'
#' @param file_lines lines of an R scripto
#'
#' @return character vector of libraries loaded with library() call
#'
#' @keywords internal
#'
#' @examples
#' file_lines <- c(
#'   "library(gridlayout) ",
#'   "# hi there I'm a comment",
#'   "   library(testing)",
#'   "#library(commentedOut)",
#'   "ui <- grid_page()"
#' )
#'
#' shinyuieditor:::get_loaded_libraries(file_lines)
#'
get_loaded_libraries <- function(file_lines) {
  regmatches(
    x = file_lines,
    m = regexpr(text = file_lines, pattern = "(?<=library\\()(\\w+)(?=\\))", perl = TRUE)
  )
}

