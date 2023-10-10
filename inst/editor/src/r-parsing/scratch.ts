/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { setup_r_parser } from "treesitter-parsers";

import { generateRAppScriptTemplate } from "./generate_app_script_template";
import { parseRScript } from "./parseRScript";

const my_parser = await setup_r_parser();

const app_script = `
library(shiny)
library(bslib)
library(DT)

ui <- page_navbar(
    title = "Hello Shiny!",
    nav(
        "Hi",
        div("Hello World")
    )
)

server <- function(input, output) {
    output$hello <- renderText({
        "Hello World"
    })
}

shinyApp(ui, server)
`;

const script_node = parseRScript(my_parser, app_script).rootNode;

const generated_template = generateRAppScriptTemplate(script_node).code;

console.log(script_node);
