devtools::load_all(".")
library(lobstr)
library(shiny)
library(bslib)

  my_custom_fn <- function(foo) {span(foo)}
rlang::expr(
   card_body_fill(my_custom_fn(foo = "bar"))
)|> 
 serialize_ast() |> 
 jsonlite::toJSON(auto_unbox = TRUE)


# file_lines <- readLines("scratch/app-w-unknown-code/app.R")
# parsed <- parse(text = file_lines, keep.source = TRUE)
# full_ast <- serialize_ast(parsed)
# jsonlite::toJSON(full_ast, auto_unbox = TRUE)