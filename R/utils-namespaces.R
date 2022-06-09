

get_namespace_and_fn <- function(namespaced_fn) {

  match_res <- regmatches(
    x = namespaced_fn,
    m = gregexec(text = namespaced_fn, pattern = "(\\w+)::(\\w+)")
  )[[1]]

  list(
    namespace = match_res[2,],
    fn = match_res[3,]
  )
}


# Make sure that the ui_name passed through has the proper namespace attached to
# it
namespace_ui_fn <- function(ui_name){
  if (ui_name %in% ui_fn_names_namespaced) return(ui_name)

  index_of_name <- which(ui_fn_names_bare == ui_name)
  if (identical(index_of_name, integer(0L))) {
    stop("The ui function ", ui_name, " is not in the list of known functions.")
  }

  ui_fn_names_namespaced[index_of_name]
}
