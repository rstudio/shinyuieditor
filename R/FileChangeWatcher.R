FileChangeWatcher <- function() {
  watcher_subscription <- NULL
  file_path <- NULL
  last_edited <- NULL

  get_last_edit_time <- function() {
    if (is.null(file_path)) {
      return(NULL)
    }

    fs::file_info(file_path)$modification_time
  }

  start_watching <- function(path_to_watch, on_update) {
    file_path <<- path_to_watch
    update_last_edit_time()

    # Make sure we cleanup any old watchers if they exist
    cleanup()

    watcher_subscription <<- create_output_subscribers(
      source_fn = get_last_edit_time,
      filter_fn = function(last_edited_new) {
        time_delta <- as.numeric(last_edited - last_edited_new)
        time_delta != 0
      },
      delay = 0.25
    )

    watcher_subscription$subscribe(
      function(last_edited_new) {
        on_update()
      }
    )
  }

  update_last_edit_time <- function() {
    last_edited <<- get_last_edit_time()
  }

  cleanup <- function() {
    if (!is.null(watcher_subscription)) {
      watcher_subscription$cancel_all()
    }
  }

  list(
    "start_watching" = start_watching,
    "update_last_edit_time" = update_last_edit_time,
    "cleanup" = cleanup
  )
}
