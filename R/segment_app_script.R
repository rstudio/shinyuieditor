file_ui_definition_bounds <- function(file_lines) {
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
    expr = ui_expr
  )
}

file_library_call_bounds <- function(file_lines){
  library_lines <- grep(pattern = '^library\\(', file_lines)
  largest_gap_between_calls <- max(library_lines[seq_along(library_lines) + 1] - library_lines, na.rm = TRUE)
  if (largest_gap_between_calls > 1){
    stop("Need to have all library calls in one block at the top of the file.")
  }

  return (
    list(
      start_line = min(library_lines),
      end_line = max(library_lines)
    )
  )
}


get_expression_bounds <- function( file_lines, expr_start_line ) {
  start <- expr_start_line
  lines <- c()
  for(i in start:length(file_lines)) {

    lines[i - start + 1] <- file_lines[i];

    # Try and parse the current lines to see if we've reached valid end of the expression
    exprs <- try( parse(text = lines), silent = TRUE )

    if (!inherits(exprs, "try-error")) {
      # No error means we were able to parse the current line set and have
      # reached the end of the expression
      return(
        list(
          start_line = start,
          end_line = i,
          lines = lines,
          expr = exprs
        )
      )
    }

  }

  stop("Failed to parse the expression provided...")
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
