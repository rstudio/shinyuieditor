
format_response <- function(response_body, content_type, status = 200L) {
  list(
    status = status,
    headers = list("Content-Type" = content_type),
    body = response_body
  )
}

# Send a list as a json blob to client
json_response <- function(response_obj, ...) {
  format_response(
    response_body = jsonlite::toJSON(response_obj, auto_unbox = TRUE),
    content_type = "application/json",
    ...
  )
}

text_response <- function(txt, ...) {
  format_response(
    response_body = txt,
    content_type = "text/html",
    ...
  )
}


# Return a function that gets the req object and then deligates running to a
# given method/path pair in a supplied handlers list
build_run_handler <- function(handlers) {
  function(req) {
    tryCatch(
      {
        method <- req$REQUEST_METHOD
        path <- req$PATH_INFO
        handlerFn <- handlers[[method]][[path]]

        if (is.null(handlerFn)) {
          stop(paste0("No call endpoint defined for path '", path, "'."))
        }

        handlerFn(jsonlite::parse_json(rawToChar(req$rook.input$read())))
      },
      error = function(e) {
        print("Failed to handle request.")
        print(e)
        text_response(
          e$message,
          status = 400L
        )
      }
    )
  }
}
