import { setup_r_parser } from "treesitter-parsers";

import { find_ui_and_server_in_singlefile_app } from "./find_ui_and_server_in_singlefile_app";
import { get_server_positions } from "./get_server_positions";
import { find_server_def_in_r_app } from "./parse_multifile_r_apps";
import { parse_r_app } from "./parse_r_app";
import { parse_r_script } from "./parse_r_script";

describe("Can find output positions in server of multifile app", async () => {
  const my_parser = await setup_r_parser();
  const server_node = find_server_def_in_r_app(
    parse_r_script(
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

  const { input_positions, output_positions } =
    get_server_positions(server_node);

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
  const { server_node } = parse_r_app(
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

  const { input_positions, output_positions } =
    get_server_positions(server_node);

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
