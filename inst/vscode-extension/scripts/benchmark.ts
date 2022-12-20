import { runRCommandCold } from "../src/R-Utils/runRCommandCold";
import { collapseText, escapeDoubleQuotes } from "../src/string-utils";

async function coldStart() {
  return async () =>
    runRCommandCold(buildParseCommand(testAppFile), { verbose: false });
}

const testAppFile = `
library(shiny)
library(gridlayout)
library(DT)
library(plotly)

ui <- grid_page(
  layout = c(
    "header  header   header  ",
    "sidebar bluePlot bluePlot",
    "table   table    plotly  ",
    "table   table    plotly  "
  ),
  row_sizes = c(
    "220px",
    "1fr",
    "1fr",
    "1fr"
  ),
  col_sizes = c(
    "395px",
    "0.59fr",
    "1.41fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    title = "Settings",
    item_gap = "12px",
    sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 12L,
      max = 100L,
      value = 30L,
      width = "100%"
    ),
    numericInput(
      inputId = "numRows",
      label = "Number of table rows",
      value = 10L,
      min = 1L,
      step = 1L,
      width = "100%"
    )
  ),
  grid_card_text(
    area = "header",
    content = "Other App",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card(
    area = "table",
    title = "Table",
    scrollable = TRUE,
    item_gap = "12px",
    DTOutput(
      outputId = "myTable",
      width = "100%"
    )
  ),
  grid_card_plot(area = "bluePlot"),
  grid_card(
    area = "plotly",
    title = "Interactive Plot",
    plotlyOutput(
      outputId = "distPlot",
      width = "100%",
      height = "100%"
    )
  )
)

server <- function(input, output) {
  output$distPlot <- renderPlotly({
    # generate bins based on input$bins from ui.R
    plot_ly(x = ~ faithful[, 2], type = "histogram")
  })

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = "steelblue", border = "white")
  })


  output$myTable <- renderDT({
    head(faithful, input$numRows)
  })
}

shinyApp(ui, server)
`;

const NUM_ITS = 1;

// liveProc().then(async (runner) => {
//   console.time("liveRunner");

//   for (let i = 0; i < NUM_ITS; i++) {
//     console.log("Live", i);
//     const res = await runner();
//   }
//   console.timeEnd("liveRunner");
// });

coldStart().then(async (runner) => {
  console.time("coldStart");
  for (let i = 0; i < NUM_ITS; i++) {
    const res = await runner();
    console.log(res);
    if (res.status === "error") {
      console.warn("Error in cold start");
    }
  }
  // console.log("Cold", i);
  console.timeEnd("coldStart");
});

function buildParseCommand(appText: string) {
  const escapedAppText = escapeDoubleQuotes(appText);

  return collapseText(
    `app_lines <- strsplit("${escapedAppText}", "\\n")[[1]]`,
    `jsonlite::toJSON(`,
    `  shinyuieditor:::get_file_ui_definition_info(app_lines, "SINGLE-FILE"),`,
    `  auto_unbox = TRUE`,
    `)`
  );
}
