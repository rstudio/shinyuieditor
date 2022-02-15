# These sit on the other side of the conversion from update_ui_nodes() and
# operate on the text-based-IR tree before it gets converted into valid R code
# again.

# [Ui code] -> update_ui_nodes()  -> [JS App] -> simplify_ui_nodes() -> [Ui code]

# Recursively update the ui tree with values that update the arguments
simplify_tree <- function(ui_node){

  # First run any updater functions for this node if they exist
  for(updater_fn in tree_simplifiers) {
    ui_node <- updater_fn(ui_node)
  }

  # Next walk through all the children and do the same
  if (!is.null(ui_node$uiChildren)){
    ui_node$uiChildren <- lapply(ui_node$uiChildren, FUN = simplify_tree)
  }

  ui_node
}


simplify_gridlayout_args <- function(node){

  if (node$uiName != "gridlayout::grid_page") {
    return(node)
  }

  areas <- node$uiArguments$areas
  rowSizes <- node$uiArguments$rowSizes
  colSizes <- node$uiArguments$colSizes
  gapSize <- node$uiArguments$gapSize

  layout_areas <- t(simplify2array(areas))

  # Add border bars
  layout_table <- paste(
    apply(layout_areas,
          FUN = function(x) paste0("| ", paste(x, collapse=" | "), " |"),
          MARGIN = 1),
    collapse = "\n")

  layout_arg <- gridlayout::to_md(
    gridlayout::new_gridlayout(
      layout_def = layout_table,
      col_sizes = simplify2array(colSizes),
      row_sizes = simplify2array(rowSizes),
      gap = gapSize
    )
  )

  # Replace the old verbose arguments with the single layout arg
  node$uiArguments$areas <- NULL
  node$uiArguments$rowSizes <- NULL
  node$uiArguments$colSizes <- NULL
  node$uiArguments$gapSize <- NULL
  # Put layout on a new line so that the table lines up across lines
  node$uiArguments$layout <- paste0("\n", layout_arg)

  node
}



# Any function that can modify a node go here, each get run on each node
tree_simplifiers <- list(
  simplify_gridlayout_args
)
