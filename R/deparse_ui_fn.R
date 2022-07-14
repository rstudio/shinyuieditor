#' Deparse ui function tree to expression
#'
#' @param ui_tree Valid ui tree intermediate representation of an apps ui
#' @param remove_namespace Should the generated code have the namespaces removed
#'   or should generated function calls take the form of `pkg::fn()`
#'
#' @return A list with `call`: language expression of the generated code, and
#'   `namespaces_removed`: a character vector of all the namespaces that were
#'   stripped from the ui functions (only has elements if `remove_namespaces =
#'   TRUE`)
#'
#' @keywords internal
#'
deparse_ui_fn <- function(ui_tree, remove_namespace = FALSE) {
  namespaces_removed <- list()
  deparse_ui_fn_internal <- function(ui_tree, is_arg = FALSE) {

    # Is the tree node just a primitive value? In that case we don't need to do
    # any special parsing
    if (!is.list(ui_tree)) {
      return(ui_tree)
    }

    # Just mirror back whatever the unknown function call was
    if (is_unknown_code(ui_tree)) {
      return(unknown_code_unwrap(ui_tree))
    }

    if (is_arg) {
      # An argument that is not a primitive type must be a (potentially named)
      # list
      return(plain_list_to_expr(ui_tree))
    }

    # If we've made if this far we should be in a full-blown ui node
    validate_ui_tree_node(ui_tree)

    # We can then recurse through the arguments/children to build up the proper
    # argument structure to be reconstructed with call2
    all_args <- lapply(
      ui_tree$uiArguments,
      deparse_ui_fn_internal,
      is_arg = TRUE
    )
    all_children <- lapply(
      ui_tree$uiChildren,
      deparse_ui_fn_internal,
      is_arg = FALSE
    )


    ui_fn_name <- ui_tree$uiName
    if (remove_namespace) {
      namespace_and_fn <- ui_fn_info[[ui_fn_name]]

      namespaces_removed[namespace_and_fn$namespace] <<- TRUE
      ui_fn_name <- namespace_and_fn$fn
    }

    # Now we can reconstruct the original function call with names attached
    rlang::call2(
      parse(text = ui_fn_name)[[1]],
      !!!all_args,
      !!!all_children
    )
  }

  list(
    call = deparse_ui_fn_internal(ui_tree),
    namespaces_removed = names(namespaces_removed)
  )
}

plain_list_to_expr <- function(x) {
  rlang::call2("list", !!!x)
}


validate_ui_tree_node <- function(node) {
  if (is.null(node$uiName)) {
    stop("Improperly formatted ui tree found - missing uiName property")
  }
  if (is.null(node$uiArguments)) {
    stop("Improperly formatted ui tree found - missing uiArguments property")
  }
}
