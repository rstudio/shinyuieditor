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

  n_rows <- length(rowSizes)
  n_cols <- length(colSizes)

  layout_areas <- t(simplify2array(areas))

  # browser()
  aligned_columns <- apply(layout_areas, FUN = function(x) format(gridlayout:::flatten(x), justify = "left"), MARGIN = 2)

  array_layout <- apply(
    matrix(
      aligned_columns,
      nrow = n_rows,
      ncol = n_cols
    ),
    FUN = function(line) paste(line, collapse = " "),
    MARGIN = 1L)
  # array_layout <- apply(matrix(aligned_columns, nrow=length(aligned_columns)), FUN = function(line) paste(line, collapse = " "), MARGIN = 1L)
#
#   # Add border bars
#   layout_table <- paste(
#     apply(layout_areas,
#           FUN = function(x) paste0("| ", paste(x, collapse=" | "), " |"),
#           MARGIN = 1),
#     collapse = "\n")
#
#   layout_arg <- gridlayout::to_md(
#     gridlayout::new_gridlayout(
#       layout_def = layout_table,
#       col_sizes = simplify2array(colSizes),
#       row_sizes = simplify2array(rowSizes),
#       gap = gapSize
#     )
#   )

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
