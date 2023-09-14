import { setup_r_parser } from "treesitter-parsers";

import { getServerPositions } from "./get_server_positions";
import { findServerDefInRApp } from "./parse_multifile_r_apps";
import { parseRApp } from "./parse_r_app";
import { parseRScript } from "./parse_r_script";

describe("Can find output positions in server of multifile app", async () => {
  const my_parser = await setup_r_parser();
  const server_node = findServerDefInRApp(
    parseRScript(
      my_parser,
      `library(ggplot2)
        
        server <- function(input, output) {
          output$dists <- renderPlot({
            ggplot(
              ChickWeight,
              aes(x = weight)
            ) +
              facet_wrap(input$distFacet) +
              geom_density(fill = "#fa551b", color = "#ee6331") +
              ggtitle(paste("Distribution of weights by", input$name)))
          })
        }`
    ).rootNode
  );

  const { input_positions, output_positions } = getServerPositions(server_node);

  test("Output bindings", () => {
    expect(output_positions.has("dists")).toBe(true);
    expect(output_positions.has("distFacet")).toBe(false);
  });

  test("Input bindings", () => {
    expect(input_positions.has("distFacet")).toBe(true);
    expect(input_positions.has("name")).toBe(true);
    expect(input_positions.has("dists")).toBe(false);
  });
});

describe("Can find output positions in server of single file app", async () => {
  const { server_node } = parseRApp(
    await setup_r_parser(),
    `library(ggplot2)

    # Here's a comment about this app
    ui <- grid_page(
      layout = c("A"),
      row_sizes = c("1fr"),
      col_sizes = c("1fr"),
      gap_size = "1rem",
      grid_card(area = "A"),
    )
    
    server <- function(input, output) {
      output$dists <- renderPlot({
        ggplot(
          ChickWeight,
          aes(x = weight)
        ) +
          facet_wrap(input$distFacet) +
          geom_density(fill = "#fa551b", color = "#ee6331") +
          ggtitle(paste("Distribution of weights by", input$name)))
      })
    }
    
    shinyApp(ui, server)`
  );

  const { input_positions, output_positions } = getServerPositions(server_node);

  test("Output bindings", () => {
    expect(output_positions.has("dists")).toBe(true);
    expect(output_positions.has("distFacet")).toBe(false);
  });

  test("Input bindings", () => {
    expect(input_positions.has("distFacet")).toBe(true);
    expect(input_positions.has("name")).toBe(true);
    expect(input_positions.has("dists")).toBe(false);
  });
});
