/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Desafio QA', () => {

  context('Q.A Challenge Luma Store', () => {

    const product = 'shirt'
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email(firstName, lastName)
    const password = faker.internet.password() + ('*')
    const street = faker.address.street()
    const city = faker.address.city()
    const zipcode = faker.address.zipCode()
    const phone = faker.phone.number()
    const summary = faker.lorem.word(2)
    const review = faker.lorem.sentences()

    beforeEach(() => {
      cy.visit('/')
    });

    it('Fluxo E2E Luma Store', () => {
      cy.title()
        .should('contain', 'Home Page - Magento eCommerce')
      cy.accessCreateAccount()
      cy.formCreateAccount(firstName, lastName, email, password)
      cy.get('.message-success')
        .should('contain', 'Thank you for registering with Fake Online Clothing Store.')
        .and('be.visible')
      cy.accessingMenProducts()
      cy.selectFirstProduct()
      cy.reviewProduct(summary, review)
      cy.selectClothingSet()
      cy.addProdutToCart()
      cy.searchProductAndSelect(product)
      cy.selectLastProduct()
      cy.selectClothingSet()
      cy.addProdutToCart()
      cy.accessingCart()
      cy.formCheckout(street, city, zipcode, phone)

      cy.accessingCheckout()
      cy.finishingPurchase()
      cy.get('h1 span')
        .should('have.text', 'Thank you for your purchase!')
        .and('be.visible')
    })
  })
})