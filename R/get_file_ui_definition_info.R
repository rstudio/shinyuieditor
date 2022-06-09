get_file_ui_definition_info <- function(file_lines) {
  parsed <- parse(text=file_lines, keep.source = TRUE)
  idx <- 0
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

  # Pluck out the expression for the ui for parsing into the IR
  ui_expr <- parsed[[idx]][[3]]

  ui_srcref <- attr(parsed, "srcref")[[idx]]

  list(
    file_lines = file_lines,
    ui_bounds = list(
      start = ui_srcref[[1]],
      end = ui_srcref[[3]]
    ),
    ui_expr = ui_expr,
    loaded_libraries = get_loaded_libraries(file_lines)
  )
}

get_loaded_libraries <- function(file_lines){
  lib_search <- regmatches(
    x = file_lines,
    m = gregexec(text = file_lines, pattern = "library\\((\\w+)\\)")
  )

  lib_search <- Filter(function(match){ length(match) > 0}, lib_search)

  vapply(
    X = lib_search,
    FUN = function(match){ match[2,] },
    FUN.VALUE = character(1L)
  )
}


replace_ui_definition <- function(file_info, new_ui_text){

  ui_start <- file_info$ui_bounds$start
  ui_end <- file_info$ui_bounds$end
  file_lines <- file_info$file_lines

  before_ui_def <- file_lines[1:ui_start-1]
  after_ui_def <- file_lines[(ui_end + 1): length(file_lines)]

  # Our new ui text doesn't have the assignment on it so we need to add that
  new_ui_def <- strsplit(paste("ui <-", new_ui_text), "\n")[[1]]

  c(
    before_ui_def,
    new_ui_def,
    after_ui_def
  )
}
