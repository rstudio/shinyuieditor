devtools::load_all(".")

launch_editor(
  app_loc =  here::here("scratch/a-brand-new-app/"),
  port = 8888,
  launch_browser = FALSE,
  stop_on_browser_close = FALSE
)
