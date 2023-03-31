devtools::load_all(".")
library(lobstr)
library(shiny)
library(bslib)

rlang::expr(
   value_box(
  title = "I got", 
  value = textOutput("my_value"),
  # showcase = bs_icon("music-note-beamed")
)
) |>
 serialize_ast() |>
# tree(index_unnamed = TRUE)
 jsonlite::toJSON(auto_unbox = TRUE)


# file_lines <- readLines("scratch/app-w-unknown-code/app.R")
# parsed <- parse(text = file_lines, keep.source = TRUE)
# full_ast <- serialize_ast(parsed)
# jsonlite::toJSON(full_ast, auto_unbox = TRUE)
