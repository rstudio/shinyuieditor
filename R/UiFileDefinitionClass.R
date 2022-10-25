# R6 class that helps watch a ui file for changes and runs a callback when it
# changes
UiFileDefinition <- R6::R6Class(
  "UiFileDefinition",
  public = list(
    file_path = NULL,
    type = NULL,
    app_info = NULL,
    last_edited = NULL,
    file_change_watcher = NULL,

    initialize = function(app_loc) {
      info <- get_app_ui_file(app_loc)
      self$file_path <- info$path
      self$type <- info$type

      self$create_file_change_watcher()
    },

    update_app_info = function() {
      self$app_info <- get_file_ui_definition_info(
        file_lines = readLines(self$file_path),
        type = self$type
      )
    },

    get_ui_tree = function() {
      self$update_app_info()
      self$app_info$ui_tree
    },

    get_last_edit_time = function() {
      fs::file_info(self$file_path)$modification_time
    },

    update_last_edit_time = function() {
      self$last_edited <- self$get_last_edit_time()
    },

    create_file_change_watcher = function() {
      self$update_last_edit_time()

      self$file_change_watcher <- create_output_subscribers(
        source_fn = self$get_last_edit_time,
        filter_fn = function(last_edited_new) {
          time_delta <- as.numeric(self$last_edited - last_edited_new)
          time_delta != 0
        },
        delay = 0.25
      )
    },

    on_file_change = function(on_update) {
      self$file_change_watcher$subscribe(
        function(last_edited_new) {
          self$update_last_edit_time()
          self$update_app_info()
          on_update()
        }
      )
    },

    cleanup = function() {
      self$file_change_watcher$cancel_all()
    },

    update_ui_file = function(new_ui_tree, remove_namespace) {
      writeLines(
        text = update_ui_definition(
          file_info = self$app_info,
          new_ui_tree = new_ui_tree,
          remove_namespace = remove_namespace
        ),
        con = self$file_path
      )
      # Make sure we record that this update was our own so the update watcher
      # doesn't trigger
      self$update_last_edit_time()

      # Make sure our info about the file is up-to-date
      self$update_app_info()
    }
  )
)


get_app_ui_tree <- function(app_loc) {
  file_info <- get_app_ui_file(app_loc)
  file_path <- file_info$path
  type <- file_info$type

  app_info <- get_file_ui_definition_info(
    file_lines = readLines(file_path),
    type = type
  )

  app_info$ui_tree
}

update_app_ui <- function(app_loc, new_ui_tree, remove_namespace) {
  file_info <- get_app_ui_file(app_loc)
  file_path <- file_info$path
  type <- file_info$type

  updated_script <- update_ui_definition(
    file_info = get_file_ui_definition_info(
      file_lines = readLines(file_path),
      type = type
    ),
    new_ui_tree = new_ui_tree,
    remove_namespace = remove_namespace
  )
  writeLines(
    text = updated_script,
    con = file_path
  )

}