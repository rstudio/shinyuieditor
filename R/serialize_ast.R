# Helper function for the vscode extension (and in general external callers.)
# Attempt to handle parsing/serialization failures gracefully
safe_parse_and_serialize <- function(app_text) {
  parsed <- tryCatch(
    {
      app_lines <- strsplit(app_text, "\\n")[[1]]
      parse(text = app_lines, keep.source = TRUE)
    },
    error = function(e) {
      list(
        type = "error",
        msg = paste0(
          "Failed to parse app2. Error message:\n",
          e$message
        )
      )
    }
  )

  if (identical(parsed[["type"]], "error")) {
    return(make_json(parsed))
  }

  serialized <- tryCatch(
    {
      list(
        type = "success",
        ast = serialize_ast(parsed)
      )
    },
    error = function(e) {
      list(
        type = "error",
        msg = paste0(
          "Failed to serialize app to ast. Error message:\n",
          e$message
        )
      )
    }
  )

  make_json(serialized)
}

make_json <- function(x) {
  jsonlite::toJSON(x, auto_unbox = TRUE)
}

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
    # Try and fill in unknown arguments. We need to wrap this in try-catch in
    # case we encounter an unknown function or an immediately invoked function
    # which call_match won't be able to introspect on. If we fail here just
    # return the call expression as we got it. Since we don't support functional
    # ui definitions we don't have to worry about this messing up ui trees
    tryCatch(
      {
        rlang::call_match(call = raw_expr, fn = eval(raw_expr[[1]]))
      },
      error = function(e) {
        return(raw_expr)
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
extract_value_and_type <- function(x) {
  # Things like df[,1] will have a "missing" node in the ast for the first
  # argument of `[`,
  if (missing(x) || identical(class(x), "srcref")) {
    list(
      val = NULL,
      type = "m"
    )
  } else if (is.atomic(x)) {
    # Numbers, and characters etc..
    list(
      val = x,
      type = if (is.character((x))) {
        "c"
      } else if (is.numeric(x)) {
        "n"
      } else if (is.logical(x)) {
        "b"
      } else {
        "u"
      }
    )
  } else if (is.symbol(x) || is_namespace_call(x)) {

    # Things like variable names and other syntactically relevant symbols
    list(
      val = deparse(x),
      type = "s"
    )
  } else {
    # This will error if we give it a non-ast-valid node so no need to do
    # exhaustive checks in this logic
    list(
      val = serialize_ast(x),
      type = "e"
    )
  }
}

parse_ast_node_value <- function(x, name, node_pos) {

  # If the node is a call with named args and unnamed ones then we may have an
  # empty character as the name, which we should treat as missing
  if (identical(name, "")) {
    name <- NULL
  }

  node <- extract_value_and_type(x)
  node$name <- name
  node$pos <- node_pos

  # If we have an unnamed argument that has an empty value then it's missing
  # and is probably caused by a trailing comma or something. We just remove
  # these
  if (identical(node$val, "") && is.null(node$name)) {
    return(NULL)
  }

  # Empty missing nodes just get removed.
  if (identical(node$type, "m") && is.null(node$name)) {
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
