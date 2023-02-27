/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('desafio qa', () => {
  context('cenario 1', () => {

    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email(firstName, lastName)
    const password = faker.internet.password() + ('*')
    const street = faker.address.street()
    const city = faker.address.city()
    const zipcode = faker.address.zipCode()
    const phone = faker.phone.number()

    beforeEach(() => {
      cy.visit('/')
    });

    it('deve estar na página Luma Store', () => {

      cy.title()
        .should('contain', 'Home Page - Magento eCommerce')

      cy.accessCreateAccount()
      cy.formCreateAccount(firstName, lastName, email, password)

      cy.contains('button', 'Create an Account')
        .click()

      cy.get('.message-success')
        .should('be.visible')

      cy.get('#search')
        .type('shirt')

      cy.get('#qs-option-7 > .qs-option-name')
        .should('be.visible')
        .click()

      cy.get('div[class*=products-grid]')
        .should('be.visible')

      cy.get('li[class*=product-item]')
        .first()
        .click()

      cy.selectClothingSet('XL')
      cy.addProdutToCart()

      cy.get('.message-success')
        .should('be.visible')
        .contains('a', 'shopping cart')
        .click()

      cy.get('.checkout-methods-items > :nth-child(1) > .action > span')
        .wait(2000)
        .click()

      cy.get('.loader > img')
        .should('be.visible')

      cy.formCheckout(street, city, zipcode, phone)

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

    it.only('produto aleatorio moda masculina', () => {
      //cy.backHome()
      cy.navigation()

    })
  })
})