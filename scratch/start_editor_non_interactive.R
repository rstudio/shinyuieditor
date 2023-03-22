devtools::load_all(".")
library(lobstr)
launch_editor(
  app_loc =  here::here("scratch/single-file-app/"),
  port = 8888,
  launch_browser = TRUE,
  stop_on_browser_close = TRUE
)
