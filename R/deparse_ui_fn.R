
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

  ui_children <- lapply(ui_tree$uiChildren, deparse_ui_fn)

  # Mash together the ui node's arguments/settings and  children into a single
  # list so we can pass it to call2 and reconstruct the proper function call
  all_fn_args <- rlang::list2(!!!ui_args, !!!ui_children)

  # Before we pass through we need to make sure we unpack any unknown code boxes
  # to their original content
  all_fn_args <- lapply(
    all_fn_args,
    function(x){
      if(is_unknown_code(x)) {
        unknown_code_unwrap(x)
      } else {
        x
      }
    }
  )

  # Now we can reconstruct the original function call with names attached
  rlang::call2(
    parse(text=ui_fn)[[1]],
    !!!all_fn_args
  )
}
