# Take a parsed R expression and turn it into a fully serializable ast
# representation. 
serialize_ast <- function(raw_expr) {

  if (!is_serializable_node(raw_expr)) {
    stop(
      "Unknown expression type, can't parse. typeof(node) = ",
      typeof(raw_expr)
    )
  }

  # Call any library calls so we know we have the proper environment to run
  # argument matching  
  if (is_library_call(raw_expr)) {
    eval(raw_expr)
  }

  # Fill in all the names of unnamed arguments
  expr <- if (is.call(raw_expr)) {
    tryCatch({
      rlang::call_match(call = raw_expr, fn = eval(raw_expr[[1]]))
    },
    error = function(e) {
        stop(
          paste0(
            "Problem with standardizing arguments supplied to expression.",
            "\nError msg: \"",
            e$message,
            "\""
          ),
          call. = FALSE
        )
      }
    )
  } else {
    raw_expr
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



# Types key: "m" = missing,  "s" = symbol, "n" = numeric/number, "b" =
# boolean/logical, "c" = string/character, "u" = unknown, "e" = expression/ast
# node

parse_ast_node_value <- function(x, name, node_pos) {
    
    # If the node is a call with named args and unnamed ones then we may have an
    # empty character as the name, which we should treat as missing
    if (identical(name, "")) {
      name <- NULL
    }


    val_type <- "u"
    # Things like df[,1] will have a "missing" node in the ast for the first
    # argument of `[`,
    val <- if (missing(x) || identical(class(x), "srcref")) {
      val_type <- "m"
      NULL
    } else if (is.atomic(x)) {
      # Numbers, and characters etc..
      val_type <- if (is.character((x))) {
        "c"
      } else if (is.numeric(x)) {
        "n"
      } else if (is.logical(x)) {
        "b"
      } else {
        "u"
      }
      x
    } else if (is.symbol(x) || is_namespace_call(x)) {
      # Things like variable names and other syntactically relevant symbols
      val_type <- "s"
      deparse(x)
    } else {
      # This will error if we give it a non-ast-valid node so no need to do
      # exhaustive checks in this logic
      val_type <- "e"
      serialize_ast(x)   
    }

    node <- list()
    node$name <- name
    node$val <- val
    node$type <- val_type
    node$pos <- node_pos

    # If we have an unnamed argument that has an empty value then it's missing
    # and is probably caused by a trailing comma or something. We just remove
    # these
    if (identical(node$val, "") && is.null(node$name)) {
      return(NULL)
    }

    # Empty missing nodes just get removed.
    if (identical(val_type, "m") && is.null(node$name)) {
      return(NULL)
    }
      
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

is_library_call <- function(expr) {
  identical(typeof(expr[[1]]), "symbol") && 
    identical(rlang::as_string(expr[[1]]), "library")
}