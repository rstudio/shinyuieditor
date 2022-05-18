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

    // Select the side panel
    cy.get('div[data-sue-path="1-0"]').click();

    cy.get('div[data-sue-path="1-0"]').should(
      "not.contain.text",
      "Bins in histogram"
    );

    // Change the label for the slider
    cy.get(".properties-panel")
      .contains("label:")
      .find("input")
      .type("{selectAll}Bins in histogram");

    cy.get('div[data-sue-path="1-0"]').should(
      "contain.text",
      "Bins in histogram"
    );
  });
});

export {};
