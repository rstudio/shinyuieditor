devtools::load_all(".")
library(lobstr)
# launch_editor(
#   app_loc =  here::here("scratch/single-file-app/"),
#   port = 8888,
#   launch_browser = FALSE,
#   stop_on_browser_close = FALSE
# )


file_lines <- readLines("scratch/single-file-app/app.R")
parsed <- parse(text = file_lines, keep.source = TRUE)

ui_expr <- rlang::expr(
  gridlayout::grid_page(
    layout = c(
      "A B",
      "C D"
    ),
    row_sizes = c(
      "120px",
      "1fr"
    ),
    col_sizes = c(
      "505px",
      "1fr"
    ),
    gap_size = "1rem",
    gridlayout::grid_card(area = "A"),
    gridlayout::grid_card_text(area = "B", content = "B"),
    gridlayout::grid_card(area = "C"),
    gridlayout::grid_card_plot(area = "D")
  )
)


fn_expr <- rlang::expr(
  function(a, b = 2) {
    a + b
  }
)


full_ast <- serialize_ast(parsed)
tree(full_ast)
# is_namespace_call <- function(expr) {
#   identical(as.character(expr[[1]]), "::")
# }

# is_array_call <- function(expr) {
#   identical(as.character(expr[[1]]), "c")
# }

# lang_to_list <- function(expr, node_metadata = NULL) {
#   num_nodes <- length(expr)
   
#   ast_node <- list()

#   for (i in 1:num_nodes) {
#     x <- expr[[i]]

#     # Things like df[,1] will have a "missing" node in the ast for the first
#     # argument of `[`,
#     if (missing(x)) {
#       x <- "<MISSING>"
#     }   
    
#     # Don't want to clutter with function source-reference 
#     if (identical(class(x), "srcref")) {
#       next
#     }
    
#     ast_node[[i]] <- if (is.symbol(x)) {
#       deparse(x)
#     } else if (is.pairlist(x)) {
#       as.list(x) 
#     } else if (!is.call(x)) {
#       x 
#     } else if (is_namespace_call(x)) {
#       deparse((x))
#     } else if (is_array_call(x)) {
#       eval((x)) 
#     } else {

#       subnode_metadata <- if (is.null(attr(expr, "srcref"))) {
#         NULL
#       } else {
#         source_ref <- attr(expr, "srcref")[[i]]
#         list( 
#           start_line = source_ref[[1]],
#           end_line = source_ref[[3]],
#           start_column = source_ref[[5]],
#           end_column = source_ref[[6]]
#         )
#       }
#       lang_to_list(x, subnode_metadata)   
#     }
#   }
#   names(ast_node) <- names(expr)

#   if (!is.null(node_metadata)) {
#     ast_node[["__metadata__"]] <- node_metadata
#   }
#   ast_node
# }

# lang_to_list(ui_expr)
# tree(lang_to_list(ui_expr))
# jsonlite::toJSON(lang_to_list(fn_expr))

# attr(parsed, "srcref")

# full_ast <- lang_to_list(parsed)
# tree(full_ast)
# lobstr::tree(parsed[1], show_attributes = TRUE)
# lobstr::tree(parsed, show_attributes = TRUE)
# lobstr::tree(full_ast)
# names(full_ast)

# lobstr::tree(lang_to_list(ui_expr))
# jsonlite::toJSON(lang_to_list(ui_expr), pretty = TRUE, auto_unbox = TRUE)

# namespace_expr <- as.list(ui_expr)[[1]]

# deparse(namespace_expr)

# lobstr::tree(lang_to_list(ui_expr))
# lobstr::tree(ui_expr)
# as.list(ui_expr)

# lapply(
#   X = as.list(ui_expr),
#   FUN = function(x) {
#     if (is.call(x)) "Call" else "Base"
#   }
# )

# as.character(getAST(ui_expr))
# # jsonlite::toJSON(ui_expr)
# # lobstr::tree(shinyuieditor:::ui_code_to_tree(ui_expr))