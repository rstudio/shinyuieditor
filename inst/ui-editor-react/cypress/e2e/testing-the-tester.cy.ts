// testing-the-tester.ts created with Cypress
/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("App landing", () => {
  beforeEach(() => {
    cy.intercept("GET", "/app-please", { fixture: "appPlease.json" }).as(
      "app-please/ stub"
    );
    cy.intercept("POST", "/UiDump", "App Dump received, thanks").as(
      "UiDump/ stub"
    );
  });

  it("successfully loads", () => {
    cy.viewport("macbook-15");
    cy.visit("http://localhost:3000");

    dragAndDrop(
      () => getElementsPanelElement(cy, "shiny::numericInput"),
      () => cy.get(`.grid-cell[data-cell-pos="1-1"]`)
    );

    // Enter a simple name for the added grid item
    cy.get(`[aria-label="New grid area naming modal"]`)
      .find(`input[type="text"]`)
      .type("{selectAll}settings{enter}");

    // Move newly added item to another grid cell
    dragAndDrop(
      () => getAppViewElement(cy, "0-0"),
      () => cy.get(`.grid-cell[data-cell-pos="1-2"]`)
    );

    // Enter a simple name for the added grid item
    cy.get(`[aria-label="New grid area naming modal"]`)
      .find(`input[type="text"]`)
      .type("{selectAll}secondSettings{enter}");

    // Move newly added grid card to new cell
    dragAndDrop(
      () => getAppViewElement(cy, "1"),
      () => cy.get(`.grid-cell[data-cell-pos="2-1"]`)
    );

    // Select the now-empty card
    getAppViewElement(cy, "0").click(20, 20);

    getPropertiesPanelSetting(cy, /panel title/i)
      .first()
      .click();

    const settingsPanelName = "App Settings";
    getPropertiesPanelSetting(cy, /panel title/i)
      .last()
      .type(`{selectAll}${settingsPanelName}`);

    // Put a slider input into the newly named settings panel card
    dragAndDrop(
      () => getElementsPanelElement(cy, "shiny::sliderInput"),
      () =>
        cy
          .contains(settingsPanelName)
          .parent()
          .find(`[aria-label="drop watcher"]`)
          .first()
    );

    // Add the numeric input back into the settings panel
    dragAndDrop(
      () => cy.get(`.app-view`).find(`[aria-label="shiny::numericInput"]`),
      () =>
        cy
          .contains(settingsPanelName)
          .parent()
          .find(`[aria-label="drop watcher"]`)
          .last()
    );

    // Delete now-empty cell with delete element button in the properties panel
    // cy.get(`.app-view`).contains(/empty/i).parent().click();
    getAppViewElement(cy, "1").click(20, 20);

    cy.contains(/delete element/i).click();
  });
});

type Getter_Fn = () => Cypress.Chainable<JQuery<HTMLElement>>;
function dragAndDrop(get_item: Getter_Fn, get_target: Getter_Fn) {
  get_item().trigger("dragstart");

  get_target()
    .trigger("dragenter", { force: true })
    .trigger("dragover", { force: true })
    .trigger("drop", { force: true })
    .wait(50);
}

function getAppViewElement(cy: Cypress.cy & CyEventEmitter, path: string) {
  return cy.get(`.app-view`).find(`[data-sue-path="${path}"]`);
}

function makeElementsPanelSel(name: string) {
  return `.elements-panel *[data-ui-name="${name}"]`;
}

function getElementsPanelElement(
  cy: Cypress.cy & CyEventEmitter,
  name: string
) {
  return cy.get(makeElementsPanelSel(name));
}

function getPropertiesPanelSetting(
  cy: Cypress.cy & CyEventEmitter,
  label: string | RegExp
) {
  return cy.get(".properties-panel").contains(label).find("input");
}

export {};
