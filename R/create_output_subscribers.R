#' Create a subscribable stream to a function output
#'
#' @param source_fn A zero-argument function who's return value is to be
#'   subscribed to.
#' @param filter_fn Optional function returning boolean that can be used to skip
#'   invoking all the subscribed functions on a given loop.
#' @param delay How frequently to poll `source_fn`.
#' @param callbacks `Shiny:::Callbacks` R6 class containing all subscriptions.
#'   Created automatically if not supplied.
#'
#' @return A list with two callbacks attached: `$subscribe()` which will add a
#'   new callback to the subscription queue that takes as its input the output
#'   of `source_fn()`; and `$cleanup` which is used to stop listening to the
#'   output of `source_fn()`.
#'
#' @examples
#'
#' clock <- shinyuieditor:::create_output_subscribers(
#'   source_fn = Sys.time,
#'   delay = 1
#' )
#'
#' tic_tok <- clock$subscribe(
#'   function(t) {
#'     cat(
#'       if (as.integer(t) %% 2 == 0) "Tic" else "Tok",
#'       "\n"
#'     )
#'   }
#' )
#' popcorn <- clock$subscribe(
#'   function(t) {
#'     cat(paste("At the tone the time is", t, "\n"))
#'   }
#' )
#'
#' # unsubscribe to just popcorn
#' popcorn()
#'
#' # stop listening entirely
#' clock$cancel_all()
#'
create_output_subscribers <- function(source_fn,
                                      filter_fn = function(...) TRUE,
                                      delay = 0.1,
                                      callbacks = shiny:::Callbacks$new()) {

  # callbacks <- shiny:::Callbacks$new()

  subscribed_fn <- source_fn

  unsubscribe <- NULL

  poll <- function() {
    had_error <- FALSE
    on.exit({
      if (had_error) {
        return()
      }

      unsubscribe <<- later::later(poll, delay = delay)
    })

    tryCatch(
      {
        out <- subscribed_fn()

        if (filter_fn(out)) {
          callbacks$invoke(out)
        }
      },
      error = function(e) {
        cat(crayon::red("Error in subscription, unsubscribing\n"))
        print(e)
        had_error <<- TRUE
      }
    )
  }

  # Kick off loop
  poll()

  cancel_all <- function() {
    if (!is.null(unsubscribe)) {
      unsubscribe()
    }
  }

  update_subscribed <- function(new_fn) {

    # Cancel the current event loop for the subscribed function
    cancel_all()

    # Create a new output subscribers result that carries over all the same
    # callback subscriptions with it
    create_output_subscribers(
      source_fn = new_fn,
      filter_fn = filter_fn,
      delay = delay,
      callbacks = callbacks
    )
  }

  list(
    subscribe = callbacks$register,
    cancel_all = cancel_all,
    update_subscribed = update_subscribed,
    callbacks = callbacks
  )
}



subscribe_once <- function(source_fn, filter_fn, callback, delay = 0.1){
  poll <- create_output_subscribers(
    source_fn = source_fn,
    filter_fn = filter_fn,
    delay = delay
  )

  listener <- poll$subscribe(function(...){
    callback()

    # Once we get the ready signal, turn off the subscription
    listener()
  })

  poll
}

