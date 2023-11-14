/// <reference types="cypress" />

describe('Confirmar cuenta mediante token recibido por email', () => {
    it('Confirmar cuenta mediante token recibido por email', () => {

        const token = "986fad46-cac0-462c-bbb4-f93abed14965";

        const url = `http://localhost:5173/confirmar/${token}`;

        cy.visit(url);
    })
})