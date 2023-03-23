# If we're on a hosted platform like RStudio workbench/server then we can't use
# localhost based urls. This function makes sure the urls generated and sent to
# the client will be safe to use and if not lets the user know how to fix the
# problem
check_for_url_issues <- function() {
  running_outside_rstudio <- get_running_outside_rstudio()

  # If we're not in RStudio we don't need to (/can't) do anything
  if (running_outside_rstudio) {
    return(TRUE)
  }

  running_on_hosted_service <- identical(
    Sys.getenv("RSTUDIO_PROGRAM_MODE"),
    "server"
  )

  # If we're not running on a hosted service we don't need to wory about
  # transforming the URLs so we're good to go. There's a chance that the ui
  # editor is running on some non-rstudio hosted service, in which case the user
  # will be out of luck although we add checks for these cases in the future if
  # need be
  if (!running_on_hosted_service) {
    return(TRUE)
  }

  has_rstudioapi <- rlang::is_installed("rstudioapi")

  # If the user has the rstudioapi package installed then we can use that to
  # convert the local urls to proxied ones so everything is all good
  if (has_rstudioapi) {
    return(TRUE)
  }

  # If we're on a server and can't translate the URL to a proxied one then we
  # need to let the user know so they can install the rstudioapi package
  stop(
    "In order to use shinyuieditor on a hosted version of RStudio you will ",
    "need to install the rstudioapi package.\n",
    "Run install.packages(\"rstudioapi\") to install it."
  )
}

get_running_outside_rstudio <- function() {
  identical(Sys.getenv("RSTUDIO"), "")
}
