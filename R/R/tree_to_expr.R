
tree_to_exp <- function(ui_tree){
  if(!is.list(ui_tree)) return(ui_tree)

  if(!rlang::is_named(ui_tree)) {
    return(lapply(ui_tree, FUN=tree_to_exp))
  }

  ui_fn <- ui_tree$uiName
  ui_args <- ui_tree$uiArguments

  if(is.null(ui_fn) || is.null(ui_args)) {
    str(ui_tree)
    stop("Improperly formatted ui tree found")
  }

  ui_children <- lapply(ui_tree$uiChildren, tree_to_exp)

  rlang::call2(
    parse(text=ui_fn)[[1]],
    !!!ui_args,
    !!!ui_children
  )
}
