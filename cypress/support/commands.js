/// <reference types="cypress" />

Cypress.Commands.add('accessCreateAccount', () => {
    cy.get('.panel > .header > :nth-child(3) > a')
        .click()

    cy.title()
        .should('contain', 'Create New Customer')
})
Cypress.Commands.add('formCreateAccount', (firstName, lastName, email, password) => {
    cy.get('input[name=firstname]')
        .type(firstName)
    cy.get('input[name=lastname]')
        .type(lastName)
    cy.get('fieldset[class*=account]')
        .within(() => {
            cy.get('input[name=email]')
                .type(email)
            cy.get('input[name=password]')
                .type(password)
            cy.get('input[name=password_confirmation]')
                .type(password)
        })
})
Cypress.Commands.add('selectClothingSet', (size) => {
    cy.get('.product-add-form')
        .wait(1000)
        .within(() => {
            cy.get('div')
                .contains(size)
                .click()

            cy.get('#option-label-color-93-item-50')
                .click()
        })
})
Cypress.Commands.add('addProdutToCart', () => {
    cy.contains('button', 'Add to Cart')
        .click()
        .should('contain.text', 'Adding...')
        .wait(2000)
})
Cypress.Commands.add('formCheckout', (street, city, zipcode, phone) => {
    cy.get('#checkout-step-shipping')
        .within(() => {
            cy.get('input[name*=street]')
                .first()
                .should('be.visible')
                .type(street)
            cy.get('input[name=city]')
                .should('be.visible')
                .type(city)
            cy.get('select[name=region_id]')
                .select(Cypress._.random(2, 39))
                .should('be.visible')
            cy.get('input[name=postcode]')
                .should('be.visible')
                .type(zipcode)
            cy.get('input[name=telephone]')
                .should('be.visible')
                .type(phone)
        })
})
Cypress.Commands.add('backHome', () => {
    cy.get('.logo')
        .click()
})
Cypress.Commands.add('navigation', () => {
    cy.get('#ui-id-5')
        .click()
})