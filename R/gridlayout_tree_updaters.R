is_grid_container_node <- function(node) {
  node$uiName %in% c("gridlayout::grid_page", "gridlayout::grid_container")
}

update_gridlayout <- function(gridlayout_node) {
  if (!is_grid_container_node(gridlayout_node)) {
    return(gridlayout_node)
  }

  # Start by setting up the layout settings object
  layout_obj <- gridlayout::new_gridlayout(
    layout_def = gridlayout_node$uiArguments$layout,
    row_sizes  = gridlayout_node$uiArguments$row_sizes,
    col_sizes  = gridlayout_node$uiArguments$col_sizes,
    gap_size   = gridlayout_node$uiArguments$gap_size
  )

  # Remove the old arguments
  gridlayout_node$uiArguments$layout <- NULL
  gridlayout_node$uiArguments$gap_size <- NULL

  # Replace with new arguments
  gridlayout_node$uiArguments$row_sizes <- layout_obj$layout$row_sizes
  gridlayout_node$uiArguments$col_sizes <- layout_obj$layout$col_sizes
  gridlayout_node$uiArguments$gap_size <- layout_obj$layout$gap
  gridlayout_node$uiArguments$areas <- gridlayout::to_matrix(layout_obj)

  gridlayout_node
}



simplify_gridlayout_args <- function(node) {
  if (!is_grid_container_node(node)) {
    return(node)
  }

  areas <- node$uiArguments$areas
  row_sizes <- simplify2array(node$uiArguments$row_sizes)
  col_sizes <- simplify2array(node$uiArguments$col_sizes)
  gap_size <- simplify2array(node$uiArguments$gap_size)


  # Depending on the json parsing etc the areas, especially when a single row or
  # column can get mangled. This function brings it back to the proper dimensions
  shape_areas <- function(x) {
    matrix(x, nrow = length(row_sizes), ncol = length(col_sizes))
  }


  # We need to flatten to an array here because when parsing the json jsonlite
  # loves to build nested lists and we need to get to an array that can be
  # coerced to a matrix
  layout_areas <- shape_areas(t(simplify2array(areas)))

  size_align <- function(x) formatC(simplify2array(x), flag = "-")

  aligned_columns <- shape_areas(
    apply(layout_areas, FUN = size_align, MARGIN = 2)
  )

  array_layout <- apply(
    aligned_columns,
    FUN = function(line) paste(line, collapse = " "),
    MARGIN = 1L
  )


  # Replace the old verbose arguments with the single layout arg
  node$uiArguments$areas <- NULL
  node$uiArguments$row_sizes <- NULL
  node$uiArguments$col_sizes <- NULL
  node$uiArguments$gap_size <- NULL

  # Put layout on a new line so that the table lines up across lines
  node$uiArguments$layout <- array_layout
  node$uiArguments$row_sizes <- row_sizes
  node$uiArguments$col_sizes <- col_sizes
  node$uiArguments$gap_size <- gap_size


  node
}
