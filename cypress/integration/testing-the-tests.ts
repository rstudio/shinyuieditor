// testing-the-tests.ts created with Cypress
/// <reference types="cypress" />

// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe("My First Test", () => {
  it("Can be dragged", () => {
    cy.viewport("macbook-15");
    cy.visit("http://localhost:3000");
    cy.get(`[aria-label="grid-view"]`).within(() => {
      cy.get(`[aria-label="header-item"]`).click();
    });

    cy.get('[aria-label="Resize upper-left"]').trigger("mousedown");

    cy.get("body")
      .trigger("mousemove", { clientX: 1000, clientY: 200 })
      .trigger("mouseup");
    cy.matchImageSnapshot();
  });
});
export {};
