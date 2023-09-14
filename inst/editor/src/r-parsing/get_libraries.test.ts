import { setup_r_parser } from "treesitter-parsers";

import { getRPackagesInScript } from "./get_r_packages_in_script";
import { parseRScript } from "./parse_r_script";

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

describe("Can find and list the libraries in a parsed script", async () => {
  const my_parser = await setup_r_parser();
  test("Simple in a row", () => {
    const script_node = parseRScript(my_parser, app_script).rootNode;

    expect(getRPackagesInScript(script_node).names).toEqual([
      "shiny",
      "bslib",
      "DT",
    ]);
  });
});
