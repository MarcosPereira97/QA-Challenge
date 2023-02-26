/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('cenario 1', () => {

  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()


  Cypress.$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function (data) {
      console.log(data);
    }
  });

  context('compra de produto', () => {

    beforeEach(() => {
      cy.visit('/')
    });

    it('deve estar na página Luma Store', () => {
      cy.title()
        .should('contain', 'Home Page - Magento eCommerce - website to practice selenium')
      cy.get('#search').type('shirt', '{enter}')
      cy.get('div[class*=products-grid]')
        .should('be.visible')

      cy.get('li[class*=product-item]')
        .first()
        .click()

      cy.get('.product-add-form')
        .wait(2500)
        .within(() => {

          cy.get('div')
            .contains('M')
            .click()

          cy.get('#option-label-color-93-item-50').click()
          cy.contains('button', 'Add to Cart').click()
        })

      cy.get('.message-success')
        .should('be.visible')

      cy.contains('a', 'shopping cart').click()

      cy.get('ul[class*=checkout-methods-items]')
        .wait(1000)
        .click()

      cy.get('#checkout-step-shipping').within(() => {
        cy.get('input[name=username]').type(faker.internet.email(firstName, lastName))
        cy.get('input[name=firstname]').type(firstName)
        cy.get('input[name=lastname]').type(lastName)
        cy.get('input[name*=street]')
          .first()
          .type(faker.address.street())
        cy.get('input[name=city]').type(faker.address.city())
      })
    })
  })
})