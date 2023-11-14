/// <reference types="cypress" />

describe('Registrar usuario', () => {
    it('Registrar usuario', () => {

        cy.visit('http://localhost:5173/registrar');

        cy.get('[data-cy=nombre-input]')
            .type('Usuario');

        cy.get('[data-cy=email-input]')
            .type('correo@correo.com');

        cy.get('[data-cy=telefono-input]')
            .type('3816768750');

        cy.get('[data-cy=password-input]')
            .type('admin123');

        cy.get('[data-cy=repitepassword-input]')
            .type('admin123');

        cy.get('[data-cy="submit-registro"]')
            .click();
    })
})