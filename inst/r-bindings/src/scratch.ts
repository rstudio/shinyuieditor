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
import { get_name_of_accessed_property } from "./get_name_of_accessed_property";
import { extract_array_contents, is_array_node } from "./NodeTypes/ArrayNode";
import { is_text_node } from "./NodeTypes/TextNode";
import {
  find_server_def_in_r_app,
  find_ui_def_in_r_app,
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
