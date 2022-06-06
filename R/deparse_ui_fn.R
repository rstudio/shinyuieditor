
deparse_ui_fn <- function(ui_tree){
  if(!is.list(ui_tree)) return(ui_tree)

  if(!rlang::is_named(ui_tree)) {
    return(lapply(ui_tree, FUN=deparse_ui_fn))
  }

  # Just mirror back whatever the unknown function call was
  if (is_unknown_code(ui_tree)){
    return(unknown_code_unwrap(ui_tree))
  }

  ui_fn <- ui_tree$uiName
  ui_args <- ui_tree$uiArguments

  if(is.null(ui_fn) || is.null(ui_args)) {
    stop("Improperly formatted ui tree found")
  }

  # We need to make sure we unpack any unknown code boxes
  # to the arguments to their original code
  for (i in 1:length(ui_args)){
    if (is_unknown_code(ui_args[[i]])) {
      ui_args[[i]] <- unknown_code_unwrap(ui_args[[i]])
    }
  }

  ui_children <- lapply(ui_tree$uiChildren, deparse_ui_fn)

  # Now we can reconstruct the original function call with names attached
  rlang::call2(
    parse(text=ui_fn)[[1]],
    !!!ui_args,
    !!!ui_children
  )
}
