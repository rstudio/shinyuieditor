library(shinyuieditor)
launch_editor(
  app_loc = here::here("scratch/webapp"),
  port = 8888,
  launch_browser = FALSE
)


launch_editor(app_loc = here::here("scratch/webapp"))
launch_editor(app_loc = here::here("scratch/just_server"))
launch_editor(app_loc = here::here("scratch/just_ui"))
launch_editor(app_loc = here::here("scratch/empty_directory"))
launch_editor(app_loc = here::here("scratch/non_existant"))
launch_editor(app_loc = here::here("scratch/broken_ui"))

launch_editor(app_loc = here::here("inst/app-templates/empty/"))
