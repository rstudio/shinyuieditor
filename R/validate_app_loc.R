# Validate that we're pointing to a directory. If the user has supplied a
# direct file. E.g. a app.R or app.py file we should back up the app loc to
# the parent location
validate_app_loc <- function(loc) {

    # If the file ends in app.R or ui.R or server.R we should back up the
    # location to the parent directory
    if (fs::path_ext(loc) %in% "R") {
        loc <- fs::path_dir(loc)
    }

    loc
}
