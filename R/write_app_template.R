
#' Setup app from template
#'
#' Takes a template object as provided by the front-end and generates a single
#' or multi-file app in provided location.
#'
#'
#' @inheritParams deparse_ui_fn
#' @inheritParams launch_editor
#' @inheritParams generate_app_template_files
#'
#' @return NULL
#'
#' @keywords internal
#'
write_app_template <- function(app_template, app_loc, remove_namespace = TRUE) {

  app_files <- generate_app_template_files(
    app_template = app_template,
    remove_namespace = remove_namespace
  )

  if (!is.null(app_files$app_file)) {
    write_app_file(
      app_lines = app_files$app_file,
      app_loc = app_loc,
      file_type = "app"
    )
  }
}

remove_app_template <- function(app_loc, app_type) {

  # If the app type is "none" this means we never added anything so there's
  # nothing to remove 
  if (identical(app_type, "none")) return()

  if (identical(app_type, "single-file")) {
    remove_app_file(app_loc = app_loc, file_type = "app")
  }
  if (identical(app_type,  "multi-file")) {
    remove_app_file(app_loc = app_loc, file_type = "ui")
    remove_app_file(app_loc = app_loc, file_type = "server")
  }

  app_loc_now_empty <- identical(length(fs::dir_ls(app_loc)), 0L)
  app_loc_is_cwd <- identical(app_loc, ".") || identical(getwd(), app_loc)

  if (app_loc_now_empty && !app_loc_is_cwd) {
    fs::dir_delete(app_loc)
  }
}

#' Generate code for app files from a template
#'
#' @param app_template Template object. See details for format.
#' @param remove_namespace
#'
#' @details Template object
#' The app template has the following information attached to it
#'  uiTree: ui AST node;
#'  outputType: "single-file" | "multi-file"
#'  otherCode: {
#'     # Extra code that will be coppied unchanged above the ui definition
#'     uiExtra?: string;
#'
#'     # List of libraries that need to be loaded in server code
#'     serverLibraries?: string[];
#'
#'     # Extra code that will be copied unchanged above server
#'     # function definition
#'     serverExtra?: string;
#'
#'     # Body of server function. This will be wrapped in the code
#'     # `function(input, output){....}`
#'     serverFunctionBody?: string;
#'   };
#'
#' @return A list with either a single "app_file" field on it when a single-file
#'   app has been requested, or both a "ui_file" and "server_file" on it for
#'   both scripts of a multi-file app
#'
#' @keywords internal
#'
generate_app_template_files <- function(app_template, remove_namespace = TRUE) {

  uiTree <- app_template$uiTree
  outputType <- app_template$outputType

  # Extract other code info into variables so it's easier to type/remember
  # what's available
  otherCode <- app_template$otherCode
  uiExtra <- otherCode$uiExtra
  serverLibraries <- otherCode$serverLibraries
  serverExtra <- otherCode$serverExtra
  serverFunctionBody <- otherCode$serverFunctionBody

  ui_dfn_code <- ui_tree_to_code(uiTree, remove_namespace)

  server_def <- paste0(
    "function(input, output) {",
    serverFunctionBody,
    "}", sep = "\n")

  output_files <- list()

  # Single-file mode will build with
  if (outputType == "single-file") {

    uiLibraries <- if (remove_namespace) ui_dfn_code$namespaces_removed else NULL

    allLibraries <- unique(c(uiLibraries, serverLibraries))

    library_calls <- paste(create_library_calls(allLibraries), collapse = "\n")

    ui_def_text <- paste0("ui <- ", paste(ui_dfn_code$text, collapse = "\n"))

    server_def_text <- paste0("server <- ", server_def)

    app_file <- paste(
      library_calls,
      uiExtra,
      ui_def_text,
      serverExtra,
      server_def_text,
      "shinyApp(ui, server)",
      sep = "\n"
    )

    output_files$app_file <- styler::style_text(app_file, scope = "tokens")
  }

  if (outputType == "multi-file") {
    stop("Haven't implemented support for multi-file app generation yet")
  }

  output_files
}
