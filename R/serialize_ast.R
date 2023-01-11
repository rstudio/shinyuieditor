# Take a parsed R expression and turn it into a fully serializable ast
# representation. 
serialize_ast <- function(expr) {

  if (!is_serializable_node(expr)) {
    stop("Unknown expression type, can't parse. typeof(node) = ", typeof(expr))
  }

  node_names <- names(expr)
   
  ast_node <- c()

  # We use a for loop here instead of an apply function because we need access
  # to the index for querying source refs
  for (i in seq_along(expr)) {
    
    val <- parse_ast_node_value(
      x = expr[[i]],
      name = node_names[i], 
      node_pos = get_source_position(attr(expr, "srcref")[[i]])
    )
    
    if (length(val) > 0) {      
      ast_node[[length(ast_node) + 1]] <- val
    }
  }

  ast_node
}


parse_ast_node_value <- function(x, name, node_pos) {

    # Things like df[,1] will have a "missing" node in the ast for the first
    # argument of `[`,
    val <- if (missing(x) || identical(class(x), "srcref")) {
      NULL
    } else if (is.atomic(x)) {
      # Numbers, and characters etc..
      x
    } else if (is.symbol(x) || is_namespace_call(x)) {
      # Things like variable names and other syntactically relevant symbols
      deparse(x)
    } else {
      # This will error if we give it a non-ast-valid node so no need to do
      # exhaustive checks in this logic
      serialize_ast(x)   
    }

    # If the node is a call with named args and unnamed ones then we may have an
    # empty character as the name, which we should treat as missing
    if (identical(name, "")) {
      name <- NULL
    }

    node <- list()
    node$name <- name
    node$val <- val
    node$pos <- node_pos
  
    node 
}

# Translate the raw integer array into meaningful position values. 
# Tuple is (line#, column#)
get_source_position <- function(source_ref) {
  if (is.null(source_ref)) {
    NULL
  } else {
    start_row <- source_ref[[1]]
    start_col <- source_ref[[5]]
    end_row <- source_ref[[3]]
    end_col <- source_ref[[6]]
    c(start_row, start_col, end_row, end_col)
  }
}

is_namespace_call <- function(expr) {
  identical(as.character(expr[[1]]), "::")
}

is_serializable_node <- function(x) {
  node_type <- typeof(x)
  identical(node_type, "pairlist") || 
    identical(node_type, "language") || 
    identical(node_type, "expression")
}