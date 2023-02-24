/// <reference types="cypress" />

describe('cenario 1', () => {
  let testData;

  before(() => {
    cy.fixture('env').then(t => {
      testData = t
    })
  });

  context('compra de produto', () => {

    beforeEach(() => {
      cy.visit('/')
    });

    it('deve estar na página Luma Store', () => {
      cy.title()
        .should('contain', 'Home Page - Magento eCommerce - website to practice selenium')
      cy.get('#search').type(testData.produto + '{enter}')
      cy.get('div[class*=products-grid]')
        .should('be.visible')

      cy.get('li[class*=product-item]')
        .first()
        .click()

      cy.get('.product-add-form')
        .wait(3000)
        .within(() => {

          cy.get('div')
            .contains('M')
            .click()
            .wait(1000)

          cy.get('#option-label-color-93-item-50').click()

          cy.contains('button', 'Add to Cart').click()
        })

        cy.get('.message-success').should('be.visible')
    });
  })
})