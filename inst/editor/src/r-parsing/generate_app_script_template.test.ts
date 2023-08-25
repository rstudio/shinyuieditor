import { setup_r_parser } from "treesitter-parsers";

import { parse_r_app } from ".";

import { generateRAppScriptTemplate } from "./generate_app_script_template";

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

const app_template = `<PACKAGES>

ui <- <UI>

server <- function(input, output) {
    output$hello <- renderText({
        "Hello World"
    })
}

shinyApp(ui, server)
`;

test("Can produce a template from a parsed ui script", async () => {
  const my_parser = await setup_r_parser();
  const { ui_node } = parse_r_app(my_parser, app_script);

  const generated_template = generateRAppScriptTemplate(ui_node).code;

  expect(generated_template).toEqual(app_template);
});
