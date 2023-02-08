FileChangeWatcher <- function(dir_root) {
  watcher_subscription <- NULL
  file_root <- fs::dir_create(dir_root)
  file_path <- NULL
  last_known_edit <- NULL

  get_last_edit_time <- function() {
    if (is.null(file_path)) {
      return(NULL)
    }

    file.mtime(file_path)
  }

  update_last_known_edit_time <- function() {
    last_known_edit <<- get_last_edit_time()
  }

  set_file_path <- function(file_to_watch) {
   file_path <<- fs::file_create(file_root, file_to_watch)
  }

  get_file_contents <- function() {
    readLines(file_path)
  }

  start_watching <- function(on_update) {

    # Make sure we cleanup any old watchers if they exist
    cleanup()

    if (is.null(file_path)){
      stop("File path to watch is uninitialized")
    }
    update_last_known_edit_time()

    watcher_subscription <<- create_output_subscribers(
      source_fn = get_last_edit_time,
      filter_fn = function(last_edited_new) {
        no_changes_to_file <- identical(last_known_edit, last_edited_new)
        return(!no_changes_to_file)
      },
      delay = 0.25
    )

    watcher_subscription$subscribe(
      function(last_edited_new) {
        on_update()
        # Update the last edit time so this doesn't get called twice
        update_last_known_edit_time()
      }
    )
  }

  update_file <- function(contents) {
    writeLines(
      text = contents,
      con = file_path
    )
    update_last_known_edit_time()
  }
 
  cleanup <- function() {
    if (!is.null(watcher_subscription)) {
      watcher_subscription$cancel_all()
    }
    last_known_edit <<- NULL
  }

  list(
    "set_file_path" = set_file_path,
    "get_file_contents" = get_file_contents,
    "start_watching" = start_watching,
    "update_file" = update_file,
    "cleanup" = cleanup
  )
}
