import type { Script_Range } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { get_node_position } from "treesitter-parsers";
import {
  setup_r_parser,
  get_assignment_nodes,
  get_ui_assignment,
} from "treesitter-parsers";
import { P } from "vitest/dist/types-e3c9754d";

import { get_imported_pkgs } from "./get_imported_pkgs";
import { extract_array_contents, is_array_node } from "./NodeTypes/ArrayNode";
import { is_text_node } from "./NodeTypes/TextNode";
import {
  get_server_node_from_r_multifile_app,
  get_ui_node_from_r_multifile_app,
} from "./parse_multifile_r_apps";
import { r_treesitter_to_ui_tree } from "./r_treesitter_to_ui_tree";

const my_parser = await setup_r_parser();
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

const server_node = get_server_node_from_r_multifile_app(
  my_parser,
  server_script
);

console.log(server_node);
