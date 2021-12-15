
to_gridlayout_ui <- function(ui_tree){

  if(ui_tree$layout$type != "gridlayout") stop("Ui tree does not appear to use gridlayout.")

  construct_gridlayout_code(
    layout =  build_gridlayout_declaration(ui_tree$layout$options),
    elements = printAllElements(ui_tree$elements)
  )
}

construct_gridlayout_code <- function(layout, elements, indent = 2){
  elements_def <- paste(names(elements), "=", elements, collapse = ",\n")

  layout_def <- paste(
    "layout = \"",
    indent_text(paste0(gridlayout::to_md(layout),"\""), num_spaces = indent),
    sep = "\n"
  )

  layout_fn_body <- paste(
    layout_def,
    elements_def,
    sep = "\n"
  )

  paste(
    "library(shiny)\nlibrary(gridlayout)",
    "",
    "ui <- grid_page(",
    indent_text(layout_fn_body,num_spaces = indent),
    ")",
    sep = "\n"
  )
}

build_gridlayout_declaration <- function(layout){
  layout_areas <- t(simplify2array(layout$areas))

  # Add border bars
  layout_table <- paste(
    apply(layout_areas,
          FUN = function(x) paste0("| ", paste(x, collapse=" | "), " |"),
          MARGIN = 1),
    collapse = "\n")

  gridlayout::new_gridlayout(
    layout_def = layout_table,
    col_sizes = simplify2array(layout$colSizes),
    row_sizes = simplify2array(layout$rowSizes),
    gap = layout$gapSize
  )
}
