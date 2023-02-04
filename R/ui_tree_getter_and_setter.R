
get_app_ui_tree <- function(app_loc) {
  file_info <- get_app_ui_file(app_loc, error_on_missing = TRUE)
  file_path <- file_info$path
  type <- file_info$type

  app_info <- get_file_ui_definition_info(
    file_lines = readLines(file_path),
    type = type
  )

  app_info$ui_tree
}



update_app_ui_with_code <- function(file_info, new_ui_code) {

  file_path <- file_info$path
  file_info <- get_file_ui_definition_info(
    file_lines = readLines(file_path),
    type = file_info$type
  )

  ui_libraries <- new_ui_code$library_calls
  new_ui_lines <- strsplit(new_ui_code$ui_code, "\n")[[1]]


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
  additional_library_lines <- create_library_calls(libraries_to_add)

  # Our new ui text doesn't have the assignment on it so we need to add that
  if (file_info$type == "SINGLE-FILE") {
    new_ui_lines[1] <- paste("ui <-", new_ui_lines[1])
  }

  updated_script <- c(
    additional_library_lines,
    before_ui_def,
    new_ui_lines,
    after_ui_def
  )

  writeLines(
    text = updated_script,
    con = file_path
  )
}