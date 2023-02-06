devtools::load_all(".")
library(lobstr)
# launch_editor(
#   app_loc =  here::here("scratch/single-file-app/"),
#   port = 8888,
#   launch_browser = FALSE,
#   stop_on_browser_close = FALSE
# )



# immediate_fn <- rlang::expr((function(a, b) a + b)(1, 2))


file_lines <- readLines("scratch/single-file-app/app.R")
parsed <- parse(text = file_lines, keep.source = TRUE)


full_ast <- serialize_ast(parsed)
jsonlite::toJSON(full_ast, auto_unbox = TRUE)

# # serialize_ast(quote(alist(a =)))
# # tree(serialize_ast(quote(df[,2])))
# # tree(serialize_ast(quote(function(a, ...){})))

# # serialize_ast(parsed)
# # bench::mark(
# #   serialize_ast(parsed),
# #   serialize_ast_no_filter(parsed)
# # )

