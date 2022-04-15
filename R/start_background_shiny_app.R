

# TODO: Return object that has events that can be subscribed to attached to it
# Use the callbacks class from Shiny
start_background_shiny_app <- function(app_loc, host, port, show_preview_app_logs) {
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

  # browser()

  # Give the app a tiny bit to spin up

  # TODO: Switch this to trying to connect to the socket because some apps will start up for longer than 1 second, some may take less. Also make sure we handle it failing.
  Sys.sleep(1)

  onLogCallbacks <- shiny:::Callbacks$new()

  subscribe_to_fn_output(
    source_fn = p$read_error_lines,
    event_handler_fn = function(lines){
      print("Logs from background app received...")
      print(paste("There are", onLogCallbacks$count(), 'registered callbacks. Envoking now...' ))
      onLogCallbacks$invoke(lines)
    }
  )

  path_to_app <- if (host == "0.0.0.0") {
    # Don't use 0.0.0.0 directly as browsers don't give it a free pass for lack
    # of SSL like they do localhost and 127.0.0.1
    "127.0.0.1"
  } else {
    host
  }

  list(
    url = paste0("http://", path_to_app, ":", port),
    process = p,
    subscribeToOnLog = onLogCallbacks$register
  )
}


subscribe_to_fn_output <- function(source_fn, event_handler_fn){

  unsubscribe <- NULL

  poll <- function(){

    out <- source_fn()

    on.exit(
      unsubscribe <<- later::later(poll, delay = 0.1)
    )

    if(length(out) > 0) {
      event_handler_fn(out)
    }
  }

  # Kick off loop
  poll()

  function(){
    if(!is.null(unsubscribe)) {
      unsubscribe()
    }
  }
}
