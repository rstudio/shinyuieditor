#' Get app ui information from script
#'
#' @param file_lines Character vector of the lines of the file that defines a
#'   shiny app's ui (as from `readLines()`).
#' @param type Is the app a single-file app? E.g. app is container entirely in
#'   `app.R`? Or is it `multi-file`?
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
#' shinyuieditor:::get_file_ui_definition_info(readLines(app_loc), type = "single-file")
#'
#' # Also handles multi-file apps
#' app_loc <- system.file("app-templates/geyser_multi-file/ui.R", package = "shinyuieditor")
#' shinyuieditor:::get_file_ui_definition_info(readLines(app_loc), type = "multi-file")
#'
get_file_ui_definition_info <- function(file_lines, type = "single-file") {
  parsed <- parse(text = file_lines, keep.source = TRUE)

  idx <- 0
  if (type == "single-file") {
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
  } else {
    # Last node in parsed file should be the ui definition
    idx <- length(parsed)
    ui_expr <- parsed[[idx]]
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

  # TODO: Update this to use the AST rather than just regex. That way we don't
  # try and load libraries that are not actually used like ones where the
  # library command is commented out. Also will help eliminate all the edge
  # cases using regex to parse code invariably stumbles on
  libr_regex <- "(?<=library\\()(\\w+)(?=\\))"

  regmatches(
    x = file_lines,
    m = regexpr(text = file_lines, pattern = libr_regex, perl = TRUE)
  )
}


#' Update the ui definition for a given ui-defining file
#'
#' @param file_info Info on the ui-defining file as obtained by
#'   `shinyuieditor:::get_file_ui_definition_info`
#' @param new_ui_tree The new UI IR tree defining the new ui for the file
#' @param remove_namespace Should the new ui be generated with namespaces
#'   stripped and `library()` calls added for any non-defined namespaces?
#'
#'
#' @return A new character vector containing the lines of the ui-defining file
#'   with the layout updated to match the `new_ui_tree`.
#'
update_ui_definition <- function(file_info, new_ui_tree, remove_namespace = TRUE) {
  new_ui <- ui_tree_to_code(new_ui_tree, remove_namespace = remove_namespace)
  ui_libraries <- new_ui$namespaces_removed
  new_ui_lines <- new_ui$text


  file_lines <- file_info$file_lines
  num_lines <- length(file_lines)
  ui_start <- file_info$ui_bounds$start
  ui_end <- file_info$ui_bounds$end

  before_ui_def <- file_lines[1:ui_start - 1]

  # use seq() instead of a simpler range because if the ui def ends at the final
  # line of the file the range will still return a single value whereas we want
  # an empty array in that case
  after_ui_def <- file_lines[seq.int(
    from = ui_end + 1L,
    length.out = num_lines - ui_end
  )]

  # Do we need to add any libraries to the app?
  libraries_to_add <- ui_libraries[!ui_libraries %in% file_info$loaded_libraries]
  additional_library_lines <- vapply(
    X = libraries_to_add,
    FUN = function(l) paste0("library(", l, ")"),
    FUN.VALUE = character(1L)
  )

  # Our new ui text doesn't have the assignment on it so we need to add that
  if (file_info$type == "single-file") {
    new_ui_lines[1] <- paste("ui <-", new_ui_lines[1])
  }

  c(
    additional_library_lines,
    before_ui_def,
    new_ui_lines,
    after_ui_def
  )
}
