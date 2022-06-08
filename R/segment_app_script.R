file_ui_definition_bounds <- function(file_lines){

  num_lines <- length(file_lines)

  ui_start_line <- grep(pattern = '^\\s*ui <-', file_lines)

  # TODO: Check to make sure we only have a single start line
  if (length(ui_start_line) > 1L){
    stop(
      "Found more than one ui defintion ",
      "as defined by 'ui <-' in your file. ",
      "Check to make sure your app script is properly formatted."
    )
  }

  parens_balance <- 0;
  for(line_index in ui_start_line:num_lines) {

    line <- file_lines[line_index]
    num_open_parens <- sum(gregexpr(pattern="\\(", text = line)[[1]] != -1)
    num_close_parens <- sum(gregexpr(pattern="\\)", text = line)[[1]] != -1)
    parens_balance <- parens_balance + num_open_parens - num_close_parens

    if (parens_balance == 0L){

      return(
        list(
          start_line = ui_start_line,
          end_line = line_index
        )
      )
    }
  }
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
