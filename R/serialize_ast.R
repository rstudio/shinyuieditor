# Take a parsed R expression and turn it into a fully serializable ast
# representation. 
serialize_ast <- function(expr, source_ref = NULL) {

  if (!is_serializable_node(expr)) {
    stop("Unknown expression type, can't parse. typeof(node) = ", typeof(expr))
  }
  node_names <- names(expr)
   
  ast_node <- list()
  ast_node_names <- c()

  # Keep track of nodes that should be removed from result because they are null
  # to keep ast compact. Null nodes are non-critical parts of the AST such as
  # the text of a function call. We will ignore them
  null_nodes <- c()

  # We use a for loop here instead of an apply function because we need access
  # to the index for querying source refs
  for (i in seq_along(expr)) {
    x <- expr[[i]]

    # Things like df[,1] will have a "missing" node in the ast for the first
    # argument of `[`,
    parsed_node <- if (missing(x)) {
      "<MISSING>"
    } else if (identical(class(x), "srcref")) {
      # Don't want to clutter with function source-reference 
      null_nodes <- c(null_nodes, i)
      next
    } else if (is.atomic(x)) {
      # Numbers, and characters etc..
      x
    } else if (is.symbol(x) || is_namespace_call(x)) {
      # Things like variable names and other syntactically relevant symbols
      deparse(x)
    } else if (is_array_call(x)) {
      eval(x)
    } else {
      # This will error if we give it a non-ast-valid node so no need to do
      # exhaustive checks in this logic
      serialize_ast(x, attr(expr, "srcref")[[i]])   
    } 

    ast_node[[i]] <- parsed_node   
    ast_node_names[i] <- node_names[i]
  }

  
  names(ast_node) <- ast_node_names

  # Remove null nodes if neccesary
  if (length(null_nodes) > 0) {
    ast_node <- ast_node[-null_nodes]
  }

  # If source ref info was passed in for the current node, add position data to
  # a metadata field
  if (!is.null(source_ref)) {
    ast_node[["__meta__"]] <- get_source_position(source_ref)
  }

  if (is.null(names(ast_node))) {
    names(ast_node) <- seq_along(ast_node)
  }
  
  ast_node
}

# Translate the raw integer array into meaningful position values. 
# Tuple is (line#, column#)
get_source_position <- function(source_ref) {
  list( 
    start_pos = c(source_ref[[1]], source_ref[[5]]),
    end_pos = c(source_ref[[3]], source_ref[[6]])
  )
}

is_namespace_call <- function(expr) {
  identical(as.character(expr[[1]]), "::")
}

is_array_call <- function(expr) {
  identical(as.character(expr[[1]]), "c")
}

is_serializable_node <- function(x) {
  node_type <- typeof(x)
  identical(node_type, "pairlist") || 
    identical(node_type, "language") || 
    identical(node_type, "expression")
}