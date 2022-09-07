# These sit on the other side of the conversion from update_ui_nodes() and
# operate on the text-based-IR tree before it gets converted into valid R code
# again.

# [Ui code] -> update_ui_nodes()  -> [JS App] -> simplify_ui_nodes() -> [Ui code]

# Recursively update the ui tree with values that update the arguments
simplify_tree <- function(ui_node) {

  # First run any updater functions for this node if they exist
  for (updater_fn in tree_simplifiers) {
    ui_node <- updater_fn(ui_node)
  }

  # Next walk through all the children and do the same
  if (!is.null(ui_node$uiChildren)) {
    ui_node$uiChildren <- lapply(ui_node$uiChildren, FUN = simplify_tree)
  }

  ui_node
}




# Any function that can modify a node go here, each get run on each node
tree_simplifiers <- list(
  simplify_gridlayout_args
)
