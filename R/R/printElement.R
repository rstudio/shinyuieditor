
printElement <- function(element_def){

  args <- element_def$componentProps

  args_wrapped <- lapply(args, function(arg){
    if(typeof(arg) == "character") return(paste0('"',arg ,'"'))
    arg
  })

  args_written <- paste0(names(args), "=", args_wrapped, collapse = ", ")

  paste0(
    element_def$name, "(", args_written, ")"
  )
}

printAllElements <- function(element_defs){
  lapply(element_defs, printElement)
}
