import { expect, test } from "@playwright/test";

import { startupMockedApp } from "./utils/mockBackend";

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
  await startupMockedApp(page, { app_script: appScript, language: "R" });

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

const twoCheckboxesApp = `library(shiny)
library(plotly)
library(gridlayout)
library(bslib)

ui <- grid_page(
  layout = c(
    "sidebar"
  ),
  gap_size = "1rem",
  col_sizes = c(
    "1fr"
  ),
  row_sizes = c(
    "1fr"
  ),
  grid_card(
    area = "sidebar",
    card_body(
      checkboxGroupInput(
        inputId = "a",
        label = "Group A",
        choices = list("choice a" = "a", "choice b" = "b")
      ),
      checkboxGroupInput(
        inputId = "myCheckboxGroup",
        label = "Group B",
        choices = list("choice a" = "a", "choice b" = "b")
      )
    )
  )
)


server <- function(input, output) {
   
}

shinyApp(ui, server)`;
test("Id input doesn't reflect previous input's values", async ({ page }) => {
  await startupMockedApp(page, { app_script: twoCheckboxesApp, language: "R" });

  // Select the first checkbox
  await page.click("text=Group A");

  // Make sure the inputId says "a"
  await expect(page.getByLabel("InputId")).toHaveValue("a");

  // Select the second checkbox group
  await page.click("text=Group B");

  // Make sure the inputId says "myCheckboxGroup"
  await expect(page.getByLabel("InputId")).toHaveValue("myCheckboxGroup");

  // Now set a new value for the checkbox id.
  await page.getByLabel("InputId").fill("newId");

  // Switching back to the first group the id should still be "a"
  await page.click("text=Group A");
  await expect(page.getByLabel("InputId")).toHaveValue("a");

  // And going back to B we should still have "newId"
  await page.click("text=Group B");
  await expect(page.getByLabel("InputId")).toHaveValue("newId");

  // Now we can get the id into an invalid state by deleting all the characters one by one
  await page.getByLabel("InputId").fill("");

  // Switching back to the first group the id should still be "a"
  await page.click("text=Group A");
  await expect(page.getByLabel("InputId")).toHaveValue("a");

  // Now going back to B we should have it say "newId" as we left it in an
  // invalid state and thus never triggered an update
  await page.click("text=Group B");
  await expect(page.getByLabel("InputId")).toHaveValue("newId");

  // Going back to group A we can try and set its id to newId also which should again be an error state
  await page.click("text=Group A");
  // First select the input id field
  const inputId = page.getByLabel("InputId");
  await inputId.click();

  // Then erase to empty on the keyboard
  await page.keyboard.down("Backspace");

  // Then type out newId on the keyboard
  await inputId.pressSequentially("newId");

  // Then click on the second group
  await page.click("text=Group B");
  // Then back to group A
  await page.click("text=Group A");
  // Now we should have the ID be "newI" because the last digit was never
  // committed to the input
  await expect(page.getByLabel("InputId")).toHaveValue("newI");
});
