import {
  setup_r_parser,
  get_assignment_nodes,
  get_ui_assignment,
} from "treesitter-parsers";

import { get_imported_pkgs } from "./get_imported_pkgs";
import { extract_array_contents, is_array_node } from "./NodeTypes/ArrayNode";
import { is_text_node } from "./NodeTypes/TextNode";
import { parse_r_script } from "./parse_r_script";
import { r_treesitter_to_ui_tree } from "./r_treesitter_to_ui_tree";

const app_script = `
library(shiny)
library(gridlayout)
library(bslib)

# Here's a comment about this app
ui <- grid_page(
  layout = c( 
    "header   header ",
    "sidebar  vbox   ",
    "cardDemo redPlot"
  ),
  row_sizes = c(
    "110px",
    "0.97fr",
    "1.03fr"
  ),
  col_sizes = c(
    "300px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    card_body_fill(
      sliderInput(
        inputId = "bins",
        label = "Number of Bins ",
        min = 12,
        max = 100,       
        value = 30,
        width = "100%"
      ),
      actionButton(inputId = "redraw", label = "Redraw"),
      textInput(
        inputId = "bins2",
        label = "Text Input",
        value = ""
      )
    )
  ),
  grid_card_text(
    area = "header",
    content = "My demo app",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "redPlot"),
  grid_card(
    area = "cardDemo",
    card_header(h2("My Card header")),
    card_body_fill(
      numericInput(
        inputId = "myNumericInput",
        label = "Numeric Input",
        value = 5
      )
    ),
    card_footer(
      textInput(
        inputId = "myTextInput",
        label = "Text Input",
        value = ""
      )
    )
  ),
  grid_card(
    area = "vbox",
    card_body_fill(
      value_box(
        title = "Look at me!",
        value = "Big number!",
        showcase = bsicons::bs_icon("database")
      )
    )
  )
)

other_ui <- "hello there"

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$redPlot <- renderPlot({
    print(input$bins2)
    print(input$bins)
    # draw the histogram with the specified number of bins
    hist(rnorm(100), col = 'orangered')
  })

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'steelblue', border = 'white')
  })

  observe({
    output$redPlot <- renderPlot({
      hist(rnorm(100), col = 'orangered')
    })
  }) %>% bindEvent(input$redraw)

  output$bluePlot2 <- renderPlot({
    #Plot code goes here
    plot(rnorm(100))
  })
}

shinyApp(ui, server)
`;

const my_parser = await setup_r_parser();
const parse_test = parse_r_script(
  my_parser,
  `value_box(
    title = "Look at me!",
    value = "Big number!",
    showcase = bsicons::bs_icon("database")
  )`
).rootNode;

const test_node = r_treesitter_to_ui_tree(parse_test.firstNamedChild!);

// const parse_test = parse_r_script(
//   my_parser,
//   `grid_card_text("myArea", content = "B")`
// ).rootNode;
// const parse_test = parse_r_script(my_parser, `c(c(1,2),c(3,4))`).rootNode;

// const test_node = parse_test.descendantsOfType("call")[0];

// if (is_array_node(test_node)) {
//   const array_contents = extract_array_contents(test_node);

//   console.log(array_contents);
// }

// const parsed_app = parse_r_script(my_parser, app_script);

// const imports = get_imported_pkgs(parsed_app);

// const assignments = get_assignment_nodes(parsed_app);

// // // console.log(my_parser);

// const ui_node = get_ui_assignment(assignments, "ui");

// const ui_tree = r_treesitter_to_ui_tree(ui_node!);

// console.log(ui_tree);
// // console.log(ui_tree);
