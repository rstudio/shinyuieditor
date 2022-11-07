FileChangeWatcher <- function() {
  watcher_subscription <- NULL
  file_path <- NULL
  last_known_edit <- NULL

  get_last_edit_time <- function() {
    if (is.null(file_path)) {
      return(NULL)
    }

    fs::file_info(file_path)$modification_time
  }

  update_last_known_edit <- function() {
    last_known_edit <<- get_last_edit_time()
  }

  start_watching <- function(path_to_watch, on_update) {

    # Make sure we cleanup any old watchers if they exist
    cleanup()

    file_path <<- path_to_watch
    update_last_known_edit()

    watcher_subscription <<- create_output_subscribers(
      source_fn = get_last_edit_time,
      filter_fn = function(last_edited_new) {
        time_delta <- as.numeric(last_known_edit - last_edited_new)
        edited_since_last_known <- time_delta != 0
       
        edited_since_last_known
      },
      delay = 0.25
    )

    watcher_subscription$subscribe(
      function(last_edited_new) {
        on_update()
        # Update the last edit time so this doesn't get called twice
        update_last_known_edit()
      }
    )
  }

 
  cleanup <- function() {
    if (!is.null(watcher_subscription)) {
      watcher_subscription$cancel_all()
    }
    last_known_edit <<- NULL
  }

  list(
    "start_watching" = start_watching,
    "update_last_edit_time" = update_last_known_edit,
    "cleanup" = cleanup
  )
}
