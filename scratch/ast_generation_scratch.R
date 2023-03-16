devtools::load_all(".")
library(lobstr)
library(shiny)
library(bslib)


make_px <- function(num) {paste0(num, "px")}
  card_height <- "200px"
rlang::expr(
   card_body_fill(
      max_height = make_px(100)
      )
)|> 
 serialize_ast() |> 
 jsonlite::toJSON(auto_unbox = TRUE)


# file_lines <- readLines("scratch/app-w-unknown-code/app.R")
# parsed <- parse(text = file_lines, keep.source = TRUE)
# full_ast <- serialize_ast(parsed)
# jsonlite::toJSON(full_ast, auto_unbox = TRUE)