/// <reference types="cypress" />

describe('Iniciar sesión', () => {
    it('Iniciar sesión', () => {

        cy.visit('http://localhost:5173/login');

        cy.get('[data-cy=email-input]')
            .type('correo@correo.com');

        cy.get('[data-cy=password-input]')
            .type('admin123');

        cy.get('[data-cy=login-submit]')
            .click();
    })
})