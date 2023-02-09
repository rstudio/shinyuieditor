FileChangeWatcher <- function(dir_root) {
  watcher_subscription <- NULL
  file_root <- fs::dir_create(dir_root)
  watched_files <- NULL
  last_known_edit <- NULL

  get_last_edit_time <- function() {
    if (is.null(watched_files)) {
      return(NULL)
    }

    max(file.mtime(watched_files))
  }

  update_last_known_edit_time <- function() {
    last_known_edit <<- get_last_edit_time()
  }

  set_watched_files <- function(files_to_watch) {
    # Make sure files exist
    watched_files <<- fs::file_create(fs::path(file_root, files_to_watch))
    names(watched_files) <<- files_to_watch
  }

  get_file_contents <- function() {
    lapply(watched_files, readLines)
  }

  start_watching <- function(on_update) {
    # Make sure we cleanup any old watchers if they exist
    cleanup()

    if (is.null(watched_files)) {
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

  update_files <- function(named_contents) {
    for (file_name in names(named_contents)) {
      path_to_file <- watched_files[paste0(file_name, ".R")]
      if (is.null(path_to_file)) {
        stop("Tried to update an unwatched file")
      }
      writeLines(
        text = named_contents[[file_name]],
        con = path_to_file
      )
    }

    update_last_known_edit_time()
  }

  # Delete the files and stop watching them as well
  delete_files <- function(delete_root = FALSE) {
    if (is.null(watched_files)) {
      return()
    }
    cleanup()
    fs::file_delete(watched_files)

    if (!delete_root) {
      return()
    }

    root_dir_now_empty <- identical(length(fs::dir_ls(file_root)), 0L)

    # We don't want to delete our current working directory on accident, so
    # check that
    root_dir_is_cwd <- identical(file_root, ".") ||
      identical(getwd(), file_root)

    if (root_dir_now_empty && !root_dir_is_cwd) {
      fs::dir_delete(file_root)
    }
  }

  cleanup <- function() {
    if (!is.null(watcher_subscription)) {
      watcher_subscription$cancel_all()
    }
    last_known_edit <<- NULL
  }

  list(
    "set_watched_files" = set_watched_files,
    "get_file_contents" = get_file_contents,
    "start_watching" = start_watching,
    "update_files" = update_files,
    "delete_files" = delete_files,
    "cleanup" = cleanup
  )
}
