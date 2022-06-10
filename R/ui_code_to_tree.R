ui_code_to_tree <- function(ui_expr, packages = c()){

  # Setup an environment for parsing that has the proper libraries in it
  parsing_env <- create_env_with_packages(packages)

  ui_tree <- parse_ui_fn(ui_expr, env = parsing_env)

  update_ui_nodes(ui_tree)
}


create_env_with_packages <- function(packages) {

  env <- new.env(parent = rlang::caller_env())

  if (length(packages) == 0) return(env)

  rlang::env_bind(env, packages = packages)

  local({
    for (pkg in packages) { 
      library(pkg, character.only = TRUE)
    }
  }, envir = env)

  env
}
