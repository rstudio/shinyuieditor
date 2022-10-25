
#' Setup app from template
#'
#' Takes a template object as provided by the front-end and generates a single
#' or multi-file app in provided location.
#'
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
#'
#' @inheritParams deparse_ui_fn
#' @param app_template Template object. See details for format.
#' @param loc Location to place app template
#'
#' @return NULL
#'
#' @keywords internal
#'
write_app_template <- function(app_template, loc, remove_namespace = TRUE) {

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
    "}", sep="\n")

  # Single-file mode will build with
  if (outputType == "single-file") {

    uiLibraries <- if (remove_namespace) ui_dfn_code$namespaces_removed else NULL

    allLibraries <- unique(c(uiLibraries, serverLibraries))

    library_calls <- paste(create_library_calls(allLibraries), collapse = "\n")

    ui_def_text <- paste0("ui <- ", paste(ui_dfn_code$text, collapse = "\n"))

    server_def_text <- paste0("server <- ", server_def)

    app_dot_r <- paste(
      library_calls,
      uiExtra,
      ui_def_text,
      serverExtra,
      server_def_text,
      sep="\n"
    )


    cat("Created the following app template!\n")
    print(styler::style_text(app_dot_r, scope = "tokens"))

    return()
  }

  stop("Haven't implemented support for multi-file app generation yet")
}
