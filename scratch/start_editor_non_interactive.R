devtools::load_all(".")
library(lobstr)
# launch_editor(
#   app_loc =  here::here("scratch/single-file-app/"),
#   port = 8888,
#   launch_browser = FALSE,
#   stop_on_browser_close = FALSE
# )

library(shiny)
library(bslib)
rlang::expr(
  card_body(
    h1("Hi there I am a h1 node"),
    fill = TRUE
  ) )|> 
 serialize_ast() |> 
 jsonlite::toJSON(auto_unbox = TRUE)

# file_lines <- readLines("scratch/single-file-app/app.R")
# parsed <- parse(text = file_lines, keep.source = TRUE)
# full_ast <- serialize_ast(parsed)
# jsonlite::toJSON(full_ast, auto_unbox = TRUE)