# Copied from https://github.com/rstudio/chromote/blob/fcc2f0d49e73cb81ff541ab14e1f27a581c02027/R/callbacks.R # nolint

# The data structure for storing callbacks is essentially a queue: items are
# added to the end, and removed from the front. Occasionally a callback will
# be manually removed from the middle of the queue. For each callback that's
# registered, we provide a function that can remove that callback from the
# queue.
callbacks <- R6::R6Class(
  "Callbacks",
  public = list(
    initialize = function() {
      # Use floating point because it has greater range than int while
      # maintaining precision of 1.0.
      private$nextId <- 1.0
      private$callbacks <- fastmap::fastmap()
    },
    add = function(callback) {
      if (!is.function(callback)) {
        stop("callback must be a function.")
      }

      # Keys are formatted like "0000000000001", "0000000000002", etc., so
      # that they can be easily sorted by numerical value.
      id <- sprintf("%013.f", private$nextId)
      private$nextId <- private$nextId + 1.0
      private$callbacks$set(id, callback)

      # Return function for unregistering the callback.
      invisible(function() {
        if (private$callbacks$has(id)) {
          private$callbacks$remove(id)
        }
      })
    },
    invoke = function(..., on_error = NULL) {
      # Ensure that calls are invoked in the order that they were registered
      keys <- private$callbacks$keys(sort = TRUE)

      errors <- character()
      if (is.null(on_error)) {
        on_error <- function(e) {
          errors[length(errors) + 1] <<- e$message
        }
      }

      for (key in keys) {
        callback <- private$callbacks$get(key)
        tryCatch(callback(...), error = on_error)
      }

      if (length(errors) != 0) {
        warning(paste0(
          length(errors), " errors occurred while executing callbacks:\n  ",
          paste(errors, collapse = "\n  ")
        ))
      }
    },
    clear = function() {
      private$callbacks <- fastmap::fastmap()
    },
    size = function() {
      private$callbacks$size()
    }
  ),
  private = list(
    nextId = NULL,
    callbacks = NULL
  )
)
