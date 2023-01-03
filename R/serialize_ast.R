
is_namespace_call <- function(expr) {
  identical(as.character(expr[[1]]), "::")
}

is_array_call <- function(expr) {
  identical(as.character(expr[[1]]), "c")
}

serialize_ast <- function(expr, source_ref = NULL) {
  num_nodes <- length(expr)
  node_names <- names(expr)
   
  ast_node <- list()
  ast_node_names <- c()

  for (i in 1:num_nodes) {

    # Using indices here could cause issues, in the situation where we do something like 
    parsed_node <- parse_ast_node(expr, i)

    if (is.null(parsed_node)) {
      next
    }

    ast_node[[i]] <- parsed_node   
    ast_node_names[i] <- node_names[i]
  }
  names(ast_node) <- ast_node_names

  if (!is.null(source_ref)) {
    ast_node[["__metadata__"]] <- list( 
      start_line = source_ref[[1]],
      end_line = source_ref[[3]],
      start_column = source_ref[[5]],
      end_column = source_ref[[6]]
    )
  }
  
  ast_node
}

parse_ast_node <- function(expr, i) {
  x <- expr[[i]]

  # Things like df[,1] will have a "missing" node in the ast for the first
  # argument of `[`,
  if (missing(x)) {
    return("<MISSING>")
  }   
  
  # Don't want to clutter with function source-reference 
  if (identical(class(x), "srcref")) {
    return(NULL)
  }

  if (is.symbol(x)) {
    deparse(x)
  } else if (is.pairlist(x)) {
    as.list(x) 
  } else if (!is.call(x)) {
    x 
  } else if (is_namespace_call(x)) {
    deparse((x))
  } else if (is_array_call(x)) {
    eval((x)) 
  } else {
    serialize_ast(x, attr(expr, "srcref")[[i]])   
  }
}
