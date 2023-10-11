/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

// import { pythonSidebarAndTabs as devModeTree } from "ui-node-definitions/src/sample_ui_trees/pythonSidebarAndTabs";

import {
  setupStaticBackend,
  ui_tree_to_script,
} from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { DEV_MODE } from "./env_variables";
import { runSUE } from "./runSUE";
// import { basicNavbarPage as devModeTree } from "./ui-node-definitions/sample_ui_trees/basicNavbarPage";
// import { bslibCards as devModeTree } from "./state/sample_ui_trees/bslibCards";
// import { errorTestingTree as devModeTree } from "./state/sample_ui_trees/errorTesting";
// const devModeApp = "TEMPLATE_CHOOSER";

// const language: LanguageMode = "PYTHON";
// const language: LanguageMode = "R";

// const devModeApp = `library(shiny)
// library(bslib)
// library(ggplot2)

// # install.packages("palmerpenguins")
// data(penguins, package = "palmerpenguins")

// ui <- page_navbar(
//   title = "Penguins dashboard",
//   sidebar = selectInput(
//     selected = "species",
//     inputId = "color_by",
//     label = "Color by",
//     choices = c(
//       "species",
//       "island",
//       "sex"
//     )
//   ),
//   collapsible = nav_spacer(),
//   nav_panel(
//         "Bill Length",
//         card(
//           full_screen = TRUE,
//           card_header("Bill Length"),
//           plotOutput("bill_length")
//         )
//       ),
//   nav_panel(
//         "Bill Depth",
//         card(
//           full_screen = TRUE,
//           card_header("Bill depth"),
//           plotOutput("bill_depth")
//         )
//       ),
//   nav_panel(
//         "Body Mass",
//         card(
//           full_screen = TRUE,
//           card_header("Body Mass"),
//           plotOutput("body_mass")
//         )
//       ),
//   nav_item(tags$a("Posit", href = "https://posit.co"))
// )

// server <- function(input, output) {
//   gg_plot <- reactive({
//     ggplot(penguins) +
//       geom_density(aes(fill = !!input$color_by), alpha = 0.2) +
//       theme_bw(base_size = 16) +
//       theme(axis.title = element_blank())
//   })

//   output$bill_length <- renderPlot(gg_plot() + aes(bill_length_mm))
//   output$bill_depth <- renderPlot(gg_plot() + aes(bill_depth_mm))
//   output$body_mass <- renderPlot(gg_plot() + aes(body_mass_g))
// }

// shinyApp(ui, server)
// `;

const devModeApp = `library(shiny)
library(bslib)
library(ggplot2)

# install.packages("palmerpenguins")
data(penguins, package = "palmerpenguins")

ui <- page_navbar(
  title = "Penguins dashboard",
  collapsible = nav_spacer(),
  sidebar = sidebar(
    title = "Sidebar Title",
    selectInput(
       selected = "species",
       inputId = "color_by",
       label = "Color by",
       choices = list(
         "species" = "species",
         "island" = "island",
         "sex" = "sex"
       )
     ),
  ),
  nav_panel(
    title = "Bill Length",
    card(
      full_screen = TRUE,
      card_header("Bill Length"),
      plotOutput(outputId = "bill_length")
    )
  ),
  nav_panel(
    title = "Bill Depth",
    card(
      full_screen = TRUE,
      card_header("Bill depth"),
      card_body(),
      plotOutput(outputId = "bill_depth")
    )
  ),
  nav_panel(
    title = "Body Mass",
    card(
      full_screen = TRUE,
      card_header("Body Mass"),
      plotOutput(outputId = "body_mass")
    )
  )
)

server <- function(input, output) {
  gg_plot <- reactive({
    ggplot(penguins) +
      geom_density(aes(fill = !!input$color_by), alpha = 0.2) +
      theme_bw(base_size = 16) +
      theme(axis.title = element_blank())
  })
  
  output$bill_length <- renderPlot(gg_plot() + aes(bill_length_mm))
  output$bill_depth <- renderPlot(gg_plot() + aes(bill_depth_mm))
  output$body_mass <- renderPlot(gg_plot() + aes(body_mass_g))
}

shinyApp(ui, server)`;
const language: LanguageMode = "R";
const app_script =
  DEV_MODE && typeof devModeApp !== "string"
    ? ui_tree_to_script({ ui_tree: devModeApp, language })
    : devModeApp;

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher();

    // If we're in dev, look at localhost 8888, otherwise use default
    const websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),
      pathToWebsocket: DEV_MODE ? "localhost:8888" : undefined,
    });

    const backendDispatch: BackendConnection =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({
            messageDispatch,
            showMessages,
            defaultInfo: { language, app_script },
          })
        : websocketDispatch;

    runSUE({
      container: document.getElementById("root"),
      backendDispatch,
      showMessages,
    });
  } catch (e) {}
})();
