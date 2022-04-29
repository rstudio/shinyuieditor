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

  requireNamespace("gridlayout", quietly = TRUE)

  areas <- node$uiArguments$areas
  rowSizes <- simplify2array(node$uiArguments$rowSizes)
  colSizes <- simplify2array(node$uiArguments$colSizes)
  gapSize <-  simplify2array(node$uiArguments$gapSize)


  # Depending on the json parsing etc the areas, especially when a single row or
  # column can get mangled. This function brings it back to the proper dimensions
  shape_areas <- function(x){
    matrix(x, nrow = length(rowSizes), ncol = length(colSizes))
  }


  # We need to flatten to an array here because when parsing the json jsonlite
  # loves to build nested lists and we need to get to an array that can be
  # coerced to a matrix
  layout_areas <- shape_areas(t(simplify2array(areas)))

  aligned_columns <- shape_areas(
    apply(layout_areas, FUN = function(x) format(x, justify = "left"), MARGIN = 2)
  )

  array_layout <- apply(
    aligned_columns,
    FUN = function(line) paste(line, collapse = " "),
    MARGIN = 1L
  )


  # Replace the old verbose arguments with the single layout arg
  node$uiArguments$areas <- NULL
  node$uiArguments$rowSizes <- NULL
  node$uiArguments$colSizes <- NULL
  node$uiArguments$gapSize <- NULL

  # Put layout on a new line so that the table lines up across lines
  node$uiArguments$layout <- array_layout
  node$uiArguments$row_sizes <- rowSizes
  node$uiArguments$col_sizes <- colSizes
  node$uiArguments$gap_size <- gapSize


  node
}



# Any function that can modify a node go here, each get run on each node
tree_simplifiers <- list(
  simplify_gridlayout_args
)
