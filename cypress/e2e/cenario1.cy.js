/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
describe('cenario 1', () => {

  context('compra de produto', () => {

    beforeEach(() => {
      cy.visit('/')
    });

    it('deve estar na página Luma Store', () => {
      cy.title()
        .should('contain', 'Home Page - Magento eCommerce - website to practice selenium')
      cy.get('#search')
        .type('shirt', '{enter}')
      cy.get('div[class*=products-grid]')
        .should('be.visible')

      cy.get('li[class*=product-item]')
        .first()
        .click()

      cy.get('.product-add-form')
        .wait(1000)
        .within(() => {
          cy.get('div')
            .contains('M')
            .click()

          cy.get('#option-label-color-93-item-50')
            .click()
          cy.contains('button', 'Add to Cart')
            .click()
            .should('contain.text', 'Adding...')
            .wait(2000)
        })

      cy.get('.message-success')
        .should('be.visible')
        .contains('a', 'shopping cart')
        .click()

      cy.get('.checkout-methods-items > :nth-child(1) > .action > span')
        .wait(2000)
        .click()

      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()

      cy.get('.loader > img')
        .should('be.visible')

      cy.get('#checkout-step-shipping')
        .within(() => {
          cy.get('input[name=username]')
            .should('be.visible')
            .type(faker.internet.email(firstName, lastName))
          cy.get('input[name=firstname]')
            .should('be.visible')
            .type(firstName)
          cy.get('input[name=lastname]')
            .should('be.visible')
            .type(lastName)
          cy.get('input[name*=street]')
            .first()
            .should('be.visible')
            .type(faker.address.street())
          cy.get('input[name=city]')
            .should('be.visible')
            .type(faker.address.city())
          cy.get('select[name=region_id]')
            .select(Cypress._.random(2, 39))
            .should('be.visible')
          cy.get('input[name=postcode]')
            .should('be.visible')
            .type(faker.address.zipCode())
          cy.get('input[name=telephone]')
            .should('be.visible')
            .type(faker.phone.number())
        })

      cy.get('.loader > img')
        .should('be.visible')
        .as('loader')

      cy.get('input[class*=radio]')
        .first()
        .click()

      cy.contains('button', 'Next')
        .click()

      cy.get('.opc-progress-bar')
        .should('contain.text', 'Review & Payments')
        .and('be.visible')

      cy.get('.loader > img')
        .should('be.visible')

      cy.get('div[class*=payment-method-title]')
        .should('contains.text', 'Check / Money order')

      cy.get('button[class*=checkout]')
        .and('be.visible')
        .click()

      cy.get('h1 span')
        .should('have.text', 'Thank you for your purchase!')
    })
  })
})