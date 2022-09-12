

# Any function that can modify a node go here, each get run on each node
node_updaters <- list(
  update_gridlayout
)

# Recursively update the ui tree with values that update the arguments
update_ui_nodes <- function(ui_node) {

  # First run any updater functions for this node if they exist
  for (updater_fn in node_updaters) {
    ui_node <- updater_fn(ui_node)
  }

  # Next walk through all the children and do the same
  if (!is.null(ui_node$uiChildren)) {
    ui_node$uiChildren <- lapply(ui_node$uiChildren, FUN = update_ui_nodes)
  }

  ui_node
}
