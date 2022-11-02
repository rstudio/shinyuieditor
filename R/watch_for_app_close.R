WatchForAppClose <- function(on_close) {

  timeout_fn <- NULL

  connection_opened <- function() {
    if (is.null(timeout_fn)) return()

    # Cancel any app close timeouts that may have been caused by the
    # user refreshing the page
    timeout_fn()
  }

  connection_closed <- function() {
    if (is.null(on_close)) {
      # If on_close is null that means the cleanup function has run
      return()
    }

    # Trigger an interrupt to stop the server if the browser
    # unmounts and then doesn't re-connect within a timeframe
    timeout_fn <<- later::later(on_close, delay = 0.5)
  }

  cleanup <- function() {
    # This removal of the `on_close` field is necessary because the httpuv
    # onClose callback will get called after the on.exit() callback and thus
    # will try and mess stuff up again.
    on_close <<- NULL
  }

  list(
    "cleanup" = cleanup,
    "connection_opened" = connection_opened,
    "connection_closed" = connection_closed
  )
}
