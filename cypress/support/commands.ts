/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare namespace Cypress {
    interface Chainable {
        // Aufgabe 6
        // Registriere deine Commands hier
        // login(email, password): Chainable<void>;
        openDetailPage(dataCyProduct: string): Chainable<void>
    }
}

// Füge hier neue Custom Commands hinzu
// Cypress.Commands.add('login', (email, password) => { ... })

// Aufgabe 6
Cypress.Commands.add('openDetailPage', (dataCyProduct: string) => {
    cy.wait('@getProducts').then(() => {
        cy.get('[data-cy="' + dataCyProduct + '"]').click();
        cy.get('[data-cy="btn_addToCart"').should("be.visible");
    });
})