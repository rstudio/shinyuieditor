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
    start_line = ui_srcref[[1]],
    end_line = ui_srcref[[3]],
    expr = ui_expr,
    loaded_libraries = get_loaded_libraries(file_lines)
  )
}

get_loaded_libraries <- function(file_lines){
  lib_search <- regmatches(
    x = file_lines,
    m = gregexec(text = file_lines, pattern = "library\\((\\w+)\\)")
  )
  lib_search <- Filter(f = function(match){ length(match) > 0}, x = lib_search)

  vapply(X = lib_search, FUN = function(match){ match[2,] }, FUN.VALUE = character(1L))
}


replace_ui_definition <- function(file_lines, file_bounds, new_ui_text){

  before_ui_def <- file_lines[1:file_bounds$start_line-1]
  after_ui_def <- file_lines[(file_bounds$end_line + 1): length(file_lines)]
  new_ui_def <- strsplit(new_ui_text, "\n")[[1]]

  c(
    before_ui_def,
    new_ui_def,
    after_ui_def
  )
}
