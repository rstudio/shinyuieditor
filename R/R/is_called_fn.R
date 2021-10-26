is_called_fn <- function(x){
  if (!rlang::is_call(x)) return(FALSE)

  # Make sure the call isn't just the namespace operator
  if(length(x) > 1 && identical(rlang::call_fn(x), base::`::`)){
    return(rlang::is_call(x[[3]]))
  }

  TRUE
}
