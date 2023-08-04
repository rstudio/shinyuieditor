/* eslint-disable @typescript-eslint/no-unused-vars */
import { setup_r_parser } from "treesitter-parsers";

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
