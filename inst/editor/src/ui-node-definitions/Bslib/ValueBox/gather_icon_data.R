# This is based on the code in the bsicons package, but modified to generate
# json data for use in auto complete for selecting icons


library(rvest)

# https://github.com/twbs/icons/releases
version <- "1.10.2"
storage_root <- here::here("inst/editor/src/assets/bsicons")

new_icon_info <- NULL

withr::with_tempdir({
  download.file(
    sprintf("https://github.com/twbs/icons/archive/refs/tags/v%s.zip", version),
    "icons.zip"
  )
  unzip("icons.zip")
  setwd(paste0("icons-", version))

  icon_files <- dir("icons", full.names = TRUE)
  icon_html <- lapply(icon_files, function(x) {
    read_html(paste(readLines(x), collapse = "\n"))
  })

  # Make sure there is one svg tag per file
  svgs <- lapply(icon_html, html_elements, "svg")
  stopifnot(unique(lengths(svgs)) == 1)

  # -------------------------------------------------------
  # Appears as though all icons are designed to be 1:1
  # aspect ratio and used with fill=currentColor, so we don't
  # need that information.
  # -------------------------------------------------------
  widths <- vapply(svgs, html_attr, character(1), "width")
  heights <- vapply(svgs, html_attr, character(1), "height")
  fills <- vapply(svgs, html_attr, character(1), "fill")
  vbs <- vapply(svgs, html_attr, character(1), "viewbox")
  stopifnot(
    unique(widths) == "16",
    unique(heights) == "16",
    unique(fills) == "currentColor",
    unique(vbs) == "0 0 16 16"
  )

  # -------------------------------------------------------
  # All the classes are just "bi bi-name"
  # -------------------------------------------------------
  classes <- vapply(svgs, html_attr, character(1), "class")
  classes <- strsplit(classes, "\\s+")
  icon_names <- sub("^bi-", "", vapply(classes, "[[", character(1), 2))

  stopifnot(
    unique(lengths(classes)) == 2,
    unique(vapply(classes, "[[", character(1), 1)) == "bi",
    all(icon_names == tools::file_path_sans_ext(basename(icon_files)))
  )

  # --------------------------------------------------------
  # Make sure there's no other svg attributes that we're missing
  # --------------------------------------------------------
  missing_attrs <- lapply(svgs, function(x) {
    setdiff(
      names(html_attrs(x)[[1]]),
      c("width", "height", "fill", "viewbox", "class", "xmlns")
    )
  })
  stopifnot(sum(lengths(missing_attrs)) == 0)

  # N.B. some icons (e.g., align-bottom) have elements other
  # than just <path>s (e.g., <rect>)
  contents <- lapply(svgs, html_elements, "*")

  new_icon_info <<- list(
    name = icon_names,
    contents = vapply(
      contents, 
      function(x) paste(as.character(x), collapse = "\n"), 
      character(1)
    )
  )
})


if (is.null(new_icon_info)) {
  stop("Failed to get new icons")
}

str(new_icon_info)

cat(
 jsonlite::toJSON(icon_names, pretty = TRUE),
  sep = "",
  file = file.path(storage_root, "all-bsicon-names.json")
)
