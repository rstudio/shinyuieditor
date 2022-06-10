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


get_loaded_libraries <- function(file_lines) {
  lib_search <- regmatches(
    x = file_lines,
    m = gregexec(text = file_lines, pattern = "library\\((\\w+)\\)")
  )

  lib_search <- Filter(function(match) {
    length(match) > 0
  }, lib_search)

  vapply(
    X = lib_search,
    FUN = function(match) {
      match[2, ]
    },
    FUN.VALUE = character(1L)
  )
}


replace_ui_definition <- function(file_info, new_ui_tree, remove_namespace = TRUE) {
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
