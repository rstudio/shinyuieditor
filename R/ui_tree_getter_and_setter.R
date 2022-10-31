
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

update_app_ui <- function(file_info, new_ui_tree, remove_namespace) {

  file_path <- file_info$path
  
  updated_script <- update_ui_definition(
    file_info = get_file_ui_definition_info(
      file_lines = readLines(file_path),
      type = file_info$type
    ),
    new_ui_tree = new_ui_tree,
    remove_namespace = remove_namespace
  )
  writeLines(
    text = updated_script,
    con = file_path
  )

}