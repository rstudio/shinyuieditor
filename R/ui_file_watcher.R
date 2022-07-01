# R6 class that helps watch a ui file for changes and runs a callback when it
# changes
UiFileWatcher <- R6::R6Class(
  "UiFileWatcher",
  public = list(
    file_path = NULL,
    last_edited = NULL,
    poll = NULL,
    initialize = function(file_path, on_update) {
      self$file_path <- file_path
      self$update_last_edit()
      self$poll <-  create_output_subscribers(
        source_fn = self$get_last_edit_time,
        filter_fn = function(last_edited_new) {
          time_delta <- as.numeric(self$last_edited - last_edited_new)
          time_delta != 0
        },
        delay = 1
      )

      self$poll$subscribe(
        function(last_edited_new) {
          self$update_last_edit()
          on_update()
        }
      )
    },
    get_last_edit_time = function() {
      fs::file_info(self$file_path)$modification_time
    },
    update_last_edit = function() {
      self$last_edited <- self$get_last_edit_time()
    },
    stop_polling = function() {
      self$poll$cancel_all()
    }
  )
)
