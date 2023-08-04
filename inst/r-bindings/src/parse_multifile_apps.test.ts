import { setup_r_parser } from "treesitter-parsers";

import { findServerDefInRApp, findUiDefInRApp } from "./parse_multifile_r_apps";
import { parseRScript } from "./parse_r_script";

describe("Can get the server node", async () => {
  const my_parser = await setup_r_parser();

  test("Normal situation with simple server function", () => {
    const server_script = `
    library(ggplot2)
    
    server <- function(input, output) {
      output$dists <- renderPlot({
        ggplot(
          ChickWeight,
          aes(x = weight)
        ) +
          facet_wrap(input$distFacet) +
          geom_density(fill = "#fa551b", color = "#ee6331") +
          ggtitle("Distribution of weights by diet")
      })
    }
    `;

    const server_node = findServerDefInRApp(
      parseRScript(my_parser, server_script).rootNode
    );

    expect(server_node.previousNamedSibling!.text).toBe("server");
  });
  test("Doesn't get thrown off by internal function defs", () => {
    const server_script = `
    library(ggplot2)
    
    helper1 <- function(number, input, output) {
      number + 1
   }

    server <- function(input, output) {
     helper2 <- function(number, input, output) {
        number + 1
     }
    }
    `;

    const server_node = findServerDefInRApp(
      parseRScript(my_parser, server_script).rootNode
    );

    expect(server_node.previousNamedSibling!.text).toBe("server");
  });
});

describe("Can get the UI node out of a standalone ui script", async () => {
  const my_parser = await setup_r_parser();

  test("Normal situation with simple ui function with dangling ui node", () => {
    const ui_script = `
    library(shiny)
    library(gridlayout)
    
    # Here's a comment about this app
    grid_page(
      layout = c("A"),
      row_sizes = c("1fr"),
      col_sizes = c("1fr"),
      gap_size = "1rem",
      grid_card(area = "A"),
    )`;

    const parsed_ui_node = parseRScript(my_parser, ui_script).rootNode;
    const ui_node = findUiDefInRApp(parsed_ui_node);

    expect(ui_node).toBeTruthy();
  });
  test("Ui function is assigned to variable", () => {
    const ui_script = `
    library(shiny)
    library(gridlayout)
    
    # Here's a comment about this app
    ui <- grid_page(
      layout = c("A"),
      row_sizes = c("1fr"),
      col_sizes = c("1fr"),
      gap_size = "1rem",
      grid_card(area = "A"),
    )`;
    const parsed_ui_node = parseRScript(my_parser, ui_script).rootNode;

    const ui_node = findUiDefInRApp(parsed_ui_node);

    expect(ui_node).toBeTruthy();
  });
});
