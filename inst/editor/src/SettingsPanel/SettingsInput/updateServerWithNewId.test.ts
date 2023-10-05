// Scaffold out test file for SettingsInput/updateServerWithNewId

import { updateServerWithNewId } from "./updateServerWithNewId";

const appScript = `library(shiny)
library(gridlayout)
library(bslib)
library(DT)

ui <- grid_page(
  layout = c(
    "sidebar",
    "table  "
  ),
  gap_size = "1rem",
  col_sizes = c(
    "1fr"
  ),
  row_sizes = c(
    "1fr",
    "1fr"
  ),
  grid_card(
    area = "sidebar",
    card_body(
      numericInput(
        inputId = "numRows",
        label = "Number of table rows",
        value = 10,
        min = 1,
        step = 1,
        width = "100%"
      )
    )
  ),
  grid_card(
    area = "table",
    card_body(DTOutput(outputId = "myTable", width = "100%"))
  )
)

server <- function(input, output) {
   
  output$myTable <- renderDT({
    head(faithful, input$numRows)
  })

  output$myTable2 <- renderDT({
    head(faithful, input$numRows1)
  })

}

shinyApp(ui, server)
`;

describe("Can update server with new id", () => {
  test("Can update output ID", () => {
    const updatedScript = updateServerWithNewId({
      oldId: "myTable",
      newId: "newId",
      appScript,
      language: "R",
    });

    // Check that the line `output$myTable <- renderDt(` has been updated
    // to `output$newId <- renderDt(`
    expect(updatedScript).toContain("output$newId <- renderDT({");

    // Make sure the similarly named output$myTable2 hasn't been updated
    expect(updatedScript).toContain("output$myTable2 <- renderDT({");
  });

  test("Can update input ID", () => {
    const updatedScript = updateServerWithNewId({
      oldId: "numRows",
      newId: "newId",
      appScript,
      language: "R",
    });

    // Check that the line `head(faithful, input$numRows)` has been updated
    // to `head(faithful, input$newId)`
    expect(updatedScript).toContain("head(faithful, input$newId)");

    // Expect the similarly named input$numRows1 hasn't been updated
    expect(updatedScript).toContain("head(faithful, input$numRows1)");
  });
});
