
deparse_ui_fn <- function(ui_tree){
  if(!is.list(ui_tree)) return(ui_tree)

  if(!rlang::is_named(ui_tree)) {
    return(lapply(ui_tree, FUN=deparse_ui_fn))
  }

  ui_fn <- ui_tree$uiName
  ui_args <- ui_tree$uiArguments

  if (ui_fn == "unknownUiFunction"){
    # Just mirror back whatever the unknown function call was
    return(unknown_code_unwrap(ui_args))
  }

  if(is.null(ui_fn) || is.null(ui_args)) {
    lobstr::tree(ui_tree)
    stop("Improperly formatted ui tree found")
  }

  ui_children <- lapply(ui_tree$uiChildren, deparse_ui_fn)

  rlang::call2(
    parse(text=ui_fn)[[1]],
    !!!ui_args,
    !!!ui_children
  )
}
