WatchForAppClose <- R6::R6Class(
  "WatchForAppClose",
  public = list(
    on_close = NULL,
    timeout_fn =  NULL,

    initialize = function(on_close) {
      self$on_close <- on_close
    },

    connection_opened = function() {
      if (is.null(self$timeout_fn)) return()

      # Cancel any app close timeouts that may have been caused by the
      # user refreshing the page
      self$timeout_fn()
    },

    connection_closed = function() {
      if (is.null(self$on_close)) {
        return()
      }

      # Trigger an interrupt to stop the server if the browser
      # unmounts and then doesn't re-connect within a timeframe
      self$timeout_fn <- later::later(self$on_close, delay = 0.5)
    },

    cleanup = function() {
      # This removal of the `on_close` field is necessary because the httpuv
      # onClose callback will get called after the on.exit() callback and thus
      # will try and mess stuff up again.
      self$on_close <- NULL
    }
  )
)
