# Basic server to communicate between react app and R

library(httpuv)
library(here)
library(magrittr)


s <- launch_editor(
  here("webapp/ui.R")
)
