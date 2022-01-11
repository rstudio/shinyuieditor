# Real UI snapshot

    Code
      parse_ui_fn(rlang::expr(gridlayout::grid_page(layout = my_layout, theme = bslib::bs_theme(),
      header = gridlayout::title_panel("This is my header"), sidebar = gridlayout::grid_panel(
        title = "Settings", shiny::sliderInput("bins", "Number of bins:", min = 1,
          value = 5, max = 10)), plot = shiny::plotOutput("distPlot"))))
    Output
      $uiName
      [1] "gridlayout::grid_page"

      $args
      $args[[1]]
      $args[[1]]$name
      [1] "layout"

      $args[[1]]$type
      [1] "constant"

      $args[[1]]$value
      [1] "my_layout"


      $args[[2]]
      $args[[2]]$name
      [1] "theme"

      $args[[2]]$type
      [1] "unknown-fn"

      $args[[2]]$value
      [1] "bslib::bs_theme()"


      $args[[3]]
      $args[[3]]$name
      [1] "header"

      $args[[3]]$type
      [1] "ui-fn"

      $args[[3]]$value
      $args[[3]]$value$uiName
      [1] "gridlayout::title_panel"

      $args[[3]]$value$args
      $args[[3]]$value$args[[1]]
      $args[[3]]$value$args[[1]]$type
      [1] "constant"

      $args[[3]]$value$args[[1]]$value
      [1] "This is my header"





      $args[[4]]
      $args[[4]]$name
      [1] "sidebar"

      $args[[4]]$type
      [1] "ui-fn"

      $args[[4]]$value
      $args[[4]]$value$uiName
      [1] "gridlayout::grid_panel"

      $args[[4]]$value$args
      $args[[4]]$value$args[[1]]
      $args[[4]]$value$args[[1]]$name
      [1] "title"

      $args[[4]]$value$args[[1]]$type
      [1] "constant"

      $args[[4]]$value$args[[1]]$value
      [1] "Settings"


      $args[[4]]$value$args[[2]]
      $args[[4]]$value$args[[2]]$type
      [1] "ui-fn"

      $args[[4]]$value$args[[2]]$value
      $args[[4]]$value$args[[2]]$value$uiName
      [1] "shiny::sliderInput"

      $args[[4]]$value$args[[2]]$value$args
      $args[[4]]$value$args[[2]]$value$args[[1]]
      $args[[4]]$value$args[[2]]$value$args[[1]]$type
      [1] "constant"

      $args[[4]]$value$args[[2]]$value$args[[1]]$value
      [1] "bins"


      $args[[4]]$value$args[[2]]$value$args[[2]]
      $args[[4]]$value$args[[2]]$value$args[[2]]$type
      [1] "constant"

      $args[[4]]$value$args[[2]]$value$args[[2]]$value
      [1] "Number of bins:"


      $args[[4]]$value$args[[2]]$value$args[[3]]
      $args[[4]]$value$args[[2]]$value$args[[3]]$name
      [1] "min"

      $args[[4]]$value$args[[2]]$value$args[[3]]$type
      [1] "constant"

      $args[[4]]$value$args[[2]]$value$args[[3]]$value
      [1] "1"


      $args[[4]]$value$args[[2]]$value$args[[4]]
      $args[[4]]$value$args[[2]]$value$args[[4]]$name
      [1] "value"

      $args[[4]]$value$args[[2]]$value$args[[4]]$type
      [1] "constant"

      $args[[4]]$value$args[[2]]$value$args[[4]]$value
      [1] "5"


      $args[[4]]$value$args[[2]]$value$args[[5]]
      $args[[4]]$value$args[[2]]$value$args[[5]]$name
      [1] "max"

      $args[[4]]$value$args[[2]]$value$args[[5]]$type
      [1] "constant"

      $args[[4]]$value$args[[2]]$value$args[[5]]$value
      [1] "10"








      $args[[5]]
      $args[[5]]$name
      [1] "plot"

      $args[[5]]$type
      [1] "ui-fn"

      $args[[5]]$value
      $args[[5]]$value$uiName
      [1] "shiny::plotOutput"

      $args[[5]]$value$args
      $args[[5]]$value$args[[1]]
      $args[[5]]$value$args[[1]]$type
      [1] "constant"

      $args[[5]]$value$args[[1]]$value
      [1] "distPlot"






