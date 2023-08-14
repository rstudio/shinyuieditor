# Function to be run by the addin in RStudio for launching the editor
launch_editor_addin <- function() {
  if (!rstudioapi::isAvailable()) {
    stop(paste0(
      "launch_editor_addin() is meant to be run exclusively in RStudio.\n",
      "You probably want launch_editor() instead."
    ))
  }

  editor_info <- rstudioapi::getActiveDocumentContext()
  app_loc <- fs::path_dir(editor_info$path)

  if (identical(app_loc, "")) {
    # If there's no reference point from which to run the
    # addin, try looking for a root to place the app by going to the
    # project if possible
    cat("No active app found, defaulting to project root for new app.", "\n", file = stderr())

    project_root <- rstudioapi::getActiveProject()

    if (is.null(project_root)) {
      stop(paste0(
        "Could not find location to run ShinyUiEditor.\n",
        "Make sure that you've either editing a file in the app's root ",
        "(such as the app.R file) or are using RStudio Projects.\n",
        "For more control, you can run the launch_editor() function manually."
      ))
    }
    app_loc <- project_root
  }

  launch_editor(
    app_loc = app_loc
  )
}
