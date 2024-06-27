// import { pythonSidebarAndTabs as devModeTree } from "ui-node-definitions/src/sample_ui_trees/pythonSidebarAndTabs";

import type { LanguageMode } from "communication-types/src/AppInfo";

import { basicNavbarPage as devModeTree } from "./ui-node-definitions/sample_ui_trees/basicNavbarPage";
// import { bslibCards as devModeTree } from "./state/sample_ui_trees/bslibCards";
// import { errorTestingTree as devModeTree } from "./state/sample_ui_trees/errorTesting";
export const devModeLanguage: LanguageMode = "R";

// The typical way to work on an app is to just paste the app code as a string
// here. For historical reasons you can also paste a ui tree.
const testApp = `
library(bslib)
library(shiny)

ui <- page_navbar(
  title = "This is my app",
  collapsible = FALSE,
  sidebar = sidebar(
    title = "My Sidebar",
    markdown(
      mds = c(
        "## My Settings",
        "Use the following settings to mess with things"
      )
    ),
    actionButton(inputId = "myButton", label = "My Button"),
    radioButtons(
      inputId = "myRadio",
      label = "My Radio",
      choices = list(
        "Choice 1" = "choice1",
        "Choice 2" = "choice2",
        "Choice 3" = "choice3"
      )
    )
  ),
  nav_panel(
    title = "Settings",
    sliderInput(
      inputId = "inputId",
      label = "Slider Input",
      min = 0,
      max = 10,
      value = 5,
      width = "100%"
    )
  ),
  nav_panel(
    title = "Plot 1",
    plotOutput(
      outputId = "MyPlot",
      width = "100%",
      height = "100%"
    )
  )
)

server <- function(input, output) {

}

shinyApp(ui, server)
`;

export const devModeApp = testApp;
