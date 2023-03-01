/// <reference types="cypress" />

Cypress.Commands.add('accessCreateAccount', () => {
    cy.get('.panel > .header > :nth-child(3) > a').click()
    if (cy.title !== 'Create New Customer') {
        cy.contains('a', 'Create an Account').click()
    } else {
        cy.title().should('contain', 'Create New Customer')
    }
})
Cypress.Commands.add('formCreateAccount', (firstName, lastName, email, password) => {
    cy.get('input[name=firstname]').type(firstName)
    cy.get('input[name=lastname]').type(lastName)
    cy.get('fieldset[class*=account]').within(() => {
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(password)
        cy.get('input[name=password_confirmation]').type(password)
    })

    cy.contains('button', 'Create an Account').click()
})
Cypress.Commands.add('searchProductAndSelect', (product) => {
    cy.get('#search')
        .type(product)

    cy.get('#qs-option-7 > .qs-option-name')
        .should('be.visible')
        .click()
})
Cypress.Commands.add('selectFirstProduct', () => {
    cy.get('div[class*=products-grid]').should('be.visible')

    cy.get('li[class*=product-item]')
        .first()
        .click()
})
Cypress.Commands.add('selectClothingSet', (size, color) => {
    cy.get('div[attribute-code=size]')
        .within(() => {
            cy.get('div[class*=swatch-option]')
                .first()
                .click()
        })
    cy.get('div[attribute-code=color]')
        .within(() => {
            cy.get('div[class*=swatch-option]')
                .first()
                .click()
        })


})
Cypress.Commands.add('addProdutToCart', () => {
    cy.contains('button', 'Add to Cart')
        .click()
        .should('contain.text', 'Adding...')
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
    cy.selectShipping()
})
Cypress.Commands.add('selectShipping', () => {
    cy.get('.loader > img').should('be.visible').as('loader')

    cy.get('input[class*=radio]')
        .first()
        .click()
})
Cypress.Commands.add('accessingCart', () => {
    cy.get('.message-success')
        .should('be.visible')
        .contains('a', 'shopping cart')
        .click()

    cy.get('.sub > .amount')
        .should(`be.visible`)

    cy.get('.checkout-methods-items > :nth-child(1) > .action > span')
        .click({ force: true })

})
Cypress.Commands.add('accessingCheckout', () => {
    cy.contains('button', 'Next')
        .click()

    cy.get('.opc-progress-bar')
        .should('contain.text', 'Review & Payments')
        .and('be.visible')
})
Cypress.Commands.add('finishingPurchase', () => {
    cy.get('div[class*=payment-method-title]')
        .should('contains.text', 'Check / Money order')

    cy.get('button[class*=checkout]')
        .and('be.visible')
        .click()
})
Cypress.Commands.add('accessingMenProducts', () => {
    cy.get('#ui-id-5').click()
})
Cypress.Commands.add('selectLastProduct', () => {
    cy.get('div[class*=products-grid]').should('be.visible')
    cy.get('li[class*=product-item]').last().click()
})
Cypress.Commands.add('reviewProduct', (summary, review) => {
    const ratings = Cypress._.random(1, 5)

    cy.get('.reviews-actions > .action')
        .click()
    cy.get('.review-form')
        .within(() => {
            cy.get(`label[class*=rating-${ratings}]`)
                .click({ force: true })
            cy.get('input[name=nickname]')
                .should('be.visible')
            cy.get('input[name=title]')
                .should('be.visible')
                .wait(1000)
                .type(summary)
            cy.get('div[class*=review-field-text]')
                .should('be.visible')
                .type(review)
        })
    cy.contains('button', 'Submit Review')
        .click()
    cy.get('.message-success')
        .should('contain', 'You submitted your review for moderation.')
        .and('be.visible')
})