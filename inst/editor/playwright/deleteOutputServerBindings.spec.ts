import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

import { startupMockedApp } from "./utils/mockBackend";

const appScript = `library(shiny)
library(gridlayout)
library(bslib)
library(DT)

ui <- grid_page(
  layout = c(
    "sidebar",
    "A  ",
    "B  "
  ),
  gap_size = "1rem",
  col_sizes = c(
    "1fr"
  ),
  row_sizes = c(
    "1fr",
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
    area = "A",
    card_body(DTOutput(outputId = "myTable", width = "100%"))
  ),
  grid_card(
    area = "B",
    card_body(DTOutput(outputId = "unboundTable", width = "100%"))
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

test("Deleting an output with a bound render function in the server will ask for confirmation", async ({
  page,
}) => {
  await startupMockedApp(page, { app_script: appScript, language: "R" });

  await openAppScriptModal(page);

  // Make sure that the line `output$myTable <- renderDT({` is visible in the modal's code chunk
  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$myTable <- renderDT"
  );

  // Make sure that the line `head(faithful, input$numRows)` is visible in the modal's code chunk
  await expect(page.getByLabel(/app script/i)).toContainText(
    "head(faithful, input$numRows)"
  );

  // Close modal
  await closeAppScriptModal(page);

  // Click on the table output node to select it
  await page.getByText("myTable").click();

  // Click the "Delete" button
  await page.getByRole("button", { name: "Delete Element" }).click();

  // Verify that we now have a popup asking if we want to delete the server code as well
  await expect(page.getByText(/element has server code/i)).toBeVisible();

  // Make sure that this hasnt deleted the table element itself yet
  await expect(page.getByText("myTable")).toBeVisible();

  // Clicking the delete button for both should... delete both
  await page.getByRole("button", { name: "Element & Server Code" }).click();

  // Make sure that the table is no longer visible
  await expect(page.getByText("myTable")).not.toBeVisible();

  // Make sure that the line `output$myTable <- renderDT({` is no longer visible in the modal's code chunk
  // Click the "Get app script" button to open the app script modal
  await openAppScriptModal(page);

  await expect(page.getByLabel(/app script/i)).not.toContainText(
    "output$myTable <- renderDT"
  );

  // Make sure the similarly named output$myTable2 is still there
  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$myTable2 <- renderDT"
  );
});

test("User can choose to keep server code when deleting bound output", async ({
  page,
}) => {
  await startupMockedApp(page, { app_script: appScript, language: "R" });

  await openAppScriptModal(page);

  // Wait for the modal to open
  await page.getByRole("dialog").isVisible();

  // Make sure that the line `output$myTable <- renderDT({` is visible in the modal's code chunk
  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$myTable <- renderDT"
  );

  // Make sure that the line `head(faithful, input$numRows)` is visible in the modal's code chunk
  await expect(page.getByLabel(/app script/i)).toContainText(
    "head(faithful, input$numRows)"
  );

  await closeAppScriptModal(page);

  // Click on the table output node to select it
  await page.getByText("myTable").click();

  // Click the "Delete" button
  await page.getByRole("button", { name: "Delete Element" }).click();

  // Clicking the delete button for just the node should only delete the node but leave the server code
  await page.getByRole("button", { name: "Element Only" }).click();

  // Make sure that the table is no longer visible
  await expect(page.getByText("myTable")).not.toBeVisible();

  // Make sure that the line `output$myTable <- renderDT({` is still visible in the modal's code chunk
  await openAppScriptModal(page);

  await expect(page.getByLabel(/app script/i)).toContainText(
    "output$myTable <- renderDT"
  );
});

test("Outputs that don't have any bound server code just get deleted without a popup", async ({
  page,
}) => {
  await startupMockedApp(page, { app_script: appScript, language: "R" });

  await page.getByText("unboundTable").click();

  await page.getByRole("button", { name: "Delete Element" }).click();

  // Make sure that the table is no longer visible
  await expect(page.getByText("unboundTable")).not.toBeVisible();
});

async function openAppScriptModal(page: Page) {
  // Click the "Get app script" button to open the app script modal
  await page.click("text=Get app script");

  // Wait for the modal to open
  await expect(page.getByRole("dialog")).toBeVisible();
}

async function closeAppScriptModal(page: Page) {
  // Close modal
  await page.click("text=Okay");
}
