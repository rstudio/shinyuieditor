#' Launch shinyuieditor server
#'
#' Spins up an instance of the `shinyuieditor` server for building new and
#' editing existing Shiny UIs. The console will be blocked while running the
#' editor.
#'
#'
#' @inheritParams httpuv::startServer
#' @param app_loc Path to directory containing Shiny app to be visually edited
#'   (either containing an `app.R` or both a `ui.R` and `server.R`). If the
#'   provided location doesn't exist, or doesn't contain an app, the user will
#'   be prompted to choose a starter template which will then be written to the
#'   location specified.
#' @param shiny_background_port Port to launch the shiny app preview on.
#'   Typically not necessary to set manually.
#' @param remove_namespace Should namespaces (`library::` prefixes) be stripped
#'   from the generated UI code? Set to `FALSE` if you prefer the style of
#'   `shiny::sliderInput()` to `sliderInput()`. If set to `TRUE`, then any
#'   libraries needed for the nodes will be loaded at the top of your `app.R` or
#'   `ui.R`.
#' @param app_preview Should a live version of the Shiny app being edited run
#'   and auto-show updates made? You may want to disable this if the app has
#'   long-running or processor intensive initialization steps.
#' @param show_logs Print status messages to the console?
#' @param show_preview_app_logs Should the logged output of the app preview be
#'   printed? Useful for debugging an app that's not working properly. These
#'   logs are already shown in the app-preview pane of the editor.
#' @param launch_browser Should the browser be automatically opened to the
#'   editor?
#' @param stop_on_browser_close Should the editor server end when the browser
#'   window is closed or is dormant for too long. Set this to false if you want
#'   to try running the app in a different browser or refreshing the browser
#'   etc..
#'
#' @export
#'
#'
#' @examples
#' if (FALSE) {
#'   # Start editor on a non-existing app directory to choose a starter template
#'   launch_editor(app_loc = "empty_directory/")
#'
#'   # You can control where the app runs just like a normal Shiny app.
#'   # This can be useful if you want to access it from a headless server
#'   launch_editor(
#'     app_loc = "my-app/",
#'     host = "0.0.0.0",
#'     port = 8888,
#'     launch_browser = FALSE,
#'     stop_on_browser_close = FALSE
#'   )
#' }
launch_editor <- function(app_loc,
                          host = "127.0.0.1",
                          port = httpuv::randomPort(),
                          shiny_background_port = httpuv::randomPort(),
                          remove_namespace = TRUE,
                          app_preview = TRUE,
                          show_logs = TRUE,
                          show_preview_app_logs = TRUE,
                          launch_browser = interactive(),
                          stop_on_browser_close = TRUE) {
  
  writeLog <- function(...) {
    if (show_logs) {
      cat(..., "\n", file = stderr())
    }
  }

  # Make sure environment will allow features to work properly
  check_for_url_issues()


  # ----------------------------------------------------------------------------
  # State variables to keep track of app location etc..
  # ----------------------------------------------------------------------------

  # file info is a list that has both the path to the app's ui (app.r for
  # single-file or ui.r for multi-file) and the type of the app (i.e
  # "single-file" or "multi-file")
  file_info <- NULL
  
  # Basic mode of server. Can either be "initializing" | "template-chooser" |
  # "editing-app". This is used to know what to do on close
  server_mode <- "initializing"


  # ----------------------------------------------------------------------------
  # Initialize classes for controling app preview and polling for updates
  # ----------------------------------------------------------------------------

  # Object that will watch for changes to the app script
  file_change_watcher <- FileChangeWatcher()

  # Empty function so variable can always be called even if the timeout hasn't
  # been initialized
  app_close_watcher <- WatchForAppClose(
    on_close = if (stop_on_browser_close) {
      function() {
        writeLog("Editor window closed, stopping server")
        rlang::interrupt()
      }
    }
  )

  # Initialize app preview object for controlling background app preview
  app_preview_obj <- AppPreview$new(
    app_loc = app_loc,
    port = shiny_background_port,
    host = host,
    print_logs = show_preview_app_logs,
    logger = writeLog
  )
  
  startup_app_preview <- function() {
    if (app_preview) {
      writeLog("Starting app preview")
      app_preview_obj$start_app()
    }
  }

  # ----------------------------------------------------------------------------
  # Main logic for responding to messages from the client. Messages have a path
  # used for routing and an optional payload. A method of responding is provided
  # with a send_msg callback
  # ----------------------------------------------------------------------------
  setup_msg_handlers <- function(send_msg) {
    
    # Parse the app's ui script and sends it to the client
    send_ui_tree_to_client <- function() {
      writeLog("=> Parsing app blob and sending to client")
      send_msg("INITIAL-DATA", get_app_ui_tree(app_loc))
    }

    request_template_chooser <- function() {
      send_msg("INITIAL-DATA", "TEMPLATE_CHOOSER")
      server_mode <<- "template-chooser"
    }

    load_new_app <- function() {
      file_info <<- get_app_ui_file(app_loc)
      send_ui_tree_to_client()
      startup_app_preview()

      file_change_watcher$start_watching(
        path_to_watch = file_info$path, 
        on_update = send_ui_tree_to_client
      )

      server_mode <<- "editing-app"
    }

    load_app_template <- function(template_info) {
      writeLog("<= Loading app template")
      write_app_template(template_info, app_loc)
      load_new_app()
    }

    write_new_ui <- function(new_ui_tree) {
      update_app_ui(
        file_info = file_info,
        new_ui_tree = new_ui_tree,
        remove_namespace = remove_namespace
      )
      file_change_watcher$update_last_edit_time()
      writeLog("<= Saved new ui state from client")
    }

    # Return a callback that takes in a message and reacts to it
    function(msg) {
      switch(msg$path,
        "APP-PREVIEW-CONNECTED" = {
          app_preview_obj$set_listeners(
            on_ready = function() {
              # Once the background preview app is up and running, we can
              # send over the URL to the react app
              send_msg("SHINY_READY", payload = app_preview_obj$url)
            },
            on_crash = function() {
              send_msg("SHINY_CRASH", payload = "uh-oh")
            },
            on_logs = function(log_lines) {
              send_msg("SHINY_LOGS", payload = log_lines)
            }
          )
        },

        "APP-PREVIEW-RESTART" = {
          app_preview_obj$restart()
        },

        "APP-PREVIEW-STOP" = {
          app_preview_obj$stop_app()
        },

        "READY-FOR-STATE" = {
          # Route to the proper starting screen based on if there's an existing
          # app or not
          if (get_app_type(app_loc) == "missing") {
            request_template_chooser()
          } else {    
            load_new_app()
          }
        },

        "STATE-UPDATE" = {
          write_new_ui(msg$payload)
        },

        "TEMPLATE-SELECTOR-REQUEST" = {
          server_mode <<- "template-chooser"
        },

        "TEMPLATE-SELECTION" = {
          load_app_template(msg$payload)
        }
      )
    }
  }

  # Cleanup on closing of the server...
  on.exit({
    # Stop all the event listeners
    app_preview_obj$stop_app()
    file_change_watcher$cleanup()
    app_close_watcher$cleanup() 

    if (server_mode == "template-chooser") {
      remove_app_template(app_loc = app_loc, app_type = file_info$type)
    }
  })

  # Let the user know that the ui editor is ready for them to use and optionally
  # open the browser to it for them
  announce_location_of_editor(port, launch_browser)

  # Main server startup - Runs in main process
  httpuv::runServer(
    host = host, port = port,
    app = list(
      onWSOpen = function(ws) {

        # Cancel any app close timeouts that may have been caused by the
        # user refreshing the page
        app_close_watcher$connection_opened()

        # Setup function to respond to client
        send_msg <- function(path, payload) {
          ws$send(format_outgoing_msg(path, payload))
        }

        handle_incoming_msg <- setup_msg_handlers(send_msg)

        # The ws object is a WebSocket object
        ws$onMessage(function(binary, raw_msg) {

          # The messages all come over in binary blob format with a type and an
          # optional payload field and need to be converted before being passed
          # to the handler callback
          handle_incoming_msg(parse_incoming_msg(raw_msg))
        })

        ws$onClose(function() {
          # When the websocket connection closes we start the timer to check if
          # it's a reload or a proper-closing of the window
          app_close_watcher$connection_closed()
        })
      },
      staticPaths = list(
        "/" = httpuv::staticPath(
          system.file("ui-editor-react/build", package = "shinyuieditor"),
          indexhtml = TRUE
        )
      )
    )
  )
}


announce_location_of_editor <- function(port, launch_browser) {
  location_of_editor <- paste0("http://localhost:", port)
  cat(crayon::bold(ascii_box(
    paste("Live editor running at", location_of_editor)
  )))

  if (launch_browser) {
    utils::browseURL(location_of_editor)
  }
}
