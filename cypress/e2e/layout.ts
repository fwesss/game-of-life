/// <reference path="../support/index.d.ts" />

describe('Site layout', () => {
  it('Has a title', () => {
    cy.visit('/')
    cy.findAllByText(/Conway's Game of Life/)
  })
})
