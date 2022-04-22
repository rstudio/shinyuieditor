

start_background_shiny_app <- function(app_loc, host, port, writeLog, show_preview_app_logs) {

  start_app <- function(){
    writeLog("Starting up background shiny app")
    p <- callr::r_bg(
      func = function(app_loc, host, port) {
        # Turn on live-reload and dev mode
        # shiny::devmode(TRUE)
        options(shiny.autoreload = TRUE)
        shiny::runApp(app_loc, port = port, host = host)
      },
      args = list(app_loc, host, port),
      supervise = TRUE # Extra security for process being cleaned up properly
    )
    writeLog("Started Shiny preview app: ", crayon::red("App PID:", p$get_pid()))
    p
  }
  p <- start_app()

  path_to_app <- if (host == "0.0.0.0") {
    # Don't use 0.0.0.0 directly as browsers don't give it a free pass for lack
    # of SSL like they do localhost and 127.0.0.1
    "127.0.0.1"
  } else {
    host
  }

  app_url <- paste0("http://", path_to_app, ":", port)

  # Listens for the app to be ready for connections
  on_ready <- create_output_subscribers(
    source_fn = function(){
      server_exists(app_url)
    },
    filter_fn = function(is_ready) is_ready
  )

  on_log <- create_output_subscribers(
    source_fn = p$read_error_lines,
    filter_fn = function(lines){
      length(lines) > 0
    }
  )

  on_crash <- create_output_subscribers(
    source_fn = p$is_alive,
    filter_fn = function(alive){
      !alive
    },
    delay = 1
  )

  if (show_preview_app_logs) {
    on_log$subscribe(log_background_app)
  }

  stop_listeners <- function(){
    writeLog("Stopping listeners\n")
    on_log$cancel_all()
    on_crash$cancel_all()
    on_ready$cancel_all()
  }

  cleanup <-  function(){
    stop_listeners()
    stop_app()
  }

  stop_app <- function(){
    tryCatch(
      {
        writeLog("=> Shutting down running shiny app...")
        # tools::SIGINT = 2
        p$signal(2L)
      },
      error = function(e) {
        writeLog("Error shutting down background Shiny app:")
        print(e)
      }
    )
  }

  restart <- function(){

    writeLog("Restarting app...\n\n")
    p <<- start_app()
    on_log <<- on_log$update_subscribed(p$read_error_lines)
    on_crash <<- on_crash$update_subscribed(p$is_alive)
  }

  list(
    url = app_url,
    on_ready = on_ready$subscribe,
    on_log = on_log$subscribe,
    on_crash = on_crash$subscribe,
    cleanup = cleanup,
    restart = restart
  )
}


#' Create a subscribable stream to a function output
#'
#' @param source_fn A zero-argument function who's return value is to be
#'   subscribed to.
#' @param filter_fn Optional function returning boolean that can be used to skip
#'   invoking all the subscribed functions on a given loop.
#' @param delay How frequently to poll `source_fn`.
#'
#' @return A list with two callbacks attached: `$subscribe()` which will add a
#'   new callback to the subscription queue that takes as its input the output
#'   of `source_fn()`; and `$cleanup` which is used to stop listening to the
#'   output of `source_fn()`.
#'
#' @examples
#'
#' clock <- create_output_subscribers(
#'   source_fn = Sys.time,
#'   delay = 1
#' )
#'
#' tic_tok <- clock$subscribe(
#'   function(t){
#'     cat(
#'       if (as.integer(t) %% 2 == 0) "Tic" else "Tok",
#'       "\n"
#'     )
#'   }
#' )
#' popcorn <- clock$subscribe(
#'   function(t){
#'     cat(paste("At the tone the time is", t, '\n'))
#'   }
#' )
#'
#' # unsubscribe to just popcorn
#' popcorn()
#'
#' # stop listening entirely
#' clock$cancel_all()
#'
create_output_subscribers <- function(
  source_fn,
  filter_fn = function(...) TRUE,
  delay = 0.1,
  callbacks = shiny:::Callbacks$new()
){

  # callbacks <- shiny:::Callbacks$new()

  subscribed_fn <- source_fn

  unsubscribe <- NULL

  poll <- function(){
    had_error <- FALSE
    on.exit({
      if (had_error) return();

      unsubscribe <<- later::later(poll, delay = delay)
    })

    tryCatch(
      {
        out <- subscribed_fn()

        if(filter_fn(out)) {
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

  cancel_all <- function(){
    if(!is.null(unsubscribe)) {
      unsubscribe()
    }
  }

  update_subscribed <- function(new_fn){

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

server_exists <- function(url_id) {
  # Using a url object instead of the url as a string because readLines() with
  # url string will cause failed connections to stay open
  url_obj <- url(url_id)
  on.exit({close(url_obj)}, add = TRUE)

  ret <- !inherits(
    try({suppressWarnings(readLines(url_obj, 1))}, silent = TRUE),
    "try-error"
  )
  ret
}
