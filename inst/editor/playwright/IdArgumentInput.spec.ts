import { test, expect } from "@playwright/test";

import { mockBackendState } from "./utils/mockBackend";

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

test("Switching between two inputs doesn't swap their values", async ({
  page,
}) => {
  await mockBackendState(page, { app_script: appScript, language: "R" });

  await page.goto("/");

  // Make sure we get past the loading splash page
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  // Click the "Get app script" button to open the app script modal
  await page.click("text=Get app script");

  // Wait for the modal to open
  await expect(page.getByRole("dialog")).toBeVisible();

  // Make sure that the line `output$myTable <- renderDT({` is visible in the modal's code chunk
  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$myTable <- renderDT"
  );

  // Make sure that the line `head(faithful, input$numRows)` is visible in the modal's code chunk
  await expect(page.getByLabel(/app script/i)).toContainText(
    "head(faithful, input$numRows)"
  );

  // Close modal
  await page.click("text=Okay");

  // Click on the table output node to select it
  await page.getByLabel("DTOutput").click();

  // Update the Output Id field to "newId"
  await page.getByLabel(/output id/i).fill("newId");

  // Now open up the app script modal again and make sure we no longer have the
  // line `output$myTable <- renderDT({` in the modal's code chunk
  // but instead have `output$newId <- renderDT({`
  await page.click("text=Get app script");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel(/app script/i)).not.toContainText(
    "output$myTable <- renderDT"
  );
  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$newId <- renderDT"
  );

  // Close modal
  await page.click("text=Okay");

  // Select the slider input node
  await page.getByLabel("NumericInput").click();

  // Update the input id to "howManyRows"
  await page.getByLabel(/inputid/i).fill("howManyRows");

  // Open the app script modal again and make sure we have the line
  // `head(faithful, input$howManyRows)` in the modal's code chunk
  await page.click("text=Get app script");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel(/app script/i)).toContainText(
    "head(faithful, input$howManyRows)"
  );

  // Last, make sure that the similarly named output$myTable2 and input$numRows1 have not been updated
  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$myTable2 <- renderDT"
  );
  await expect(page.getByLabel(/app script/i)).toContainText(
    "head(faithful, input$numRows1)"
  );
});
