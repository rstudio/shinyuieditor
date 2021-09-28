// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Example Cypress TodoMVC test', () => {
  beforeEach(() => {
    // usually we recommend setting baseUrl in cypress.json
    // but for simplicity of this example we just use it here
    // https://on.cypress.io/visit
    cy.visit('http://todomvc.com/examples/vue/')
  })

  it('adds 2 todos', function () {
    cy.get('.new-todo')
      .type('learn testing{enter}')
      .type('be cool{enter}')
    cy.get('.todo-list li').should('have.length', 2)
  })

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
})
