// testing-the-tests.ts created with Cypress
/// <reference types="cypress" />

describe("Dragging Behavior", () => {
  it("Shrinks item when dragged smaller", () => {
    cy.viewport("macbook-15");
    cy.visit("http://localhost:3000");

    cy.get(`[aria-label="grid-view"]`).within(() => {
      cy.get(`[aria-label="header-item"]`)
        .should("have.css", "grid-column")
        .and("equal", "1 / 4");
      cy.get(`[aria-label="header-item"]`).click();
    });

    cy.get('[aria-label="Resize upper-left"]').trigger("mousedown");

    cy.get("body")
      .trigger("mousemove", { clientX: 1200, clientY: 200 })
      .trigger("mouseup");

    cy.get(`[aria-label="grid-view"]`).within(() => {
      cy.get(`[aria-label="header-item"]`)
        .should("have.css", "grid-column")
        .and("equal", "2 / 4");
    });
    // cy.matchImageSnapshot();
  });
});
export {};
