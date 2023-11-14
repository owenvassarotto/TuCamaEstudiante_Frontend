/// <reference types="cypress" />

describe('Publicar un alojamiento', () => {
    it('Publicar un alojamiento', () => {

        // Iniciar sesión para poder publicar
        cy.visit('http://localhost:5173/login');

        cy.get('[data-cy=email-input]')
            .type('correo@correo.com');

        cy.get('[data-cy=password-input]')
            .type('admin123');

        cy.get('[data-cy=login-submit]')
            .click();

        // Esperar a que la página de inicio se cargue completamente
        cy.wait(2000);

        // Publicar alojamiento tipo habitación
        cy.visit('http://localhost:5173/cuenta/alojamientos/nuevo');

        cy.get('[data-cy=titulo-input]')
            .type('Hermosa habitación en el corazón de Mendoza');

        cy.get('[data-cy=provincia-select]')
            .select('Mendoza');

        cy.get('[data-cy=direccion-input]')
            .type('Av. España 740 2 D');

        cy.get('[data-cy=tipo-alojamiento]')
            .select('habitacion');

        cy.get('[data-cy=dormitorios]')
            .type(1);

        cy.get('[data-cy=banos]')
            .type(1);

        cy.get('[data-cy=link-foto]')
            .type('https://i.imgur.com/8Kufhcp.jpg');

        cy.get('[data-cy="agregar-foto"]')
            .click();

        cy.get('[data-cy=ambientes]')
            .type(1);

        cy.get('[data-cy=metros-cuadrados]')
            .type(20);
        
        cy.get('[data-cy=capacidad-personas]')
            .type(1);

        cy.get('[data-cy=precio-input]')
            .type(70000);
        
        cy.get('[data-cy=moneda-select]')
            .select('ARS');

        cy.get('[data-cy=descripcion]')
            .type("Acogedora habitación para estudiante. Este espacioso alojamiento cuenta con comodidades modernas y está ubicado en una zona tranquila y conveniente. Disfruta de una sala de estar luminosa, una cocina totalmente equipada y un ambiente ideal para estudiar. ¡Tu hogar estudiantil perfecto te espera!");
        
        cy.get('[data-cy="publicar-submit"]')
            .click();

        cy.wait(2000);
            
        // Publicar alojamiento tipo departamento
        cy.visit('http://localhost:5173/cuenta/alojamientos/nuevo');
        cy.wait(2000);

        cy.get('[data-cy=titulo-input]')
            .type('Departamento en el centro de la ciudad de San Miguel de Tucumán');

        cy.get('[data-cy=provincia-select]')
            .select('Tucumán');

        cy.get('[data-cy=direccion-input]')
            .type('9 de Julio 457');

        cy.get('[data-cy=tipo-alojamiento]')
            .select('departamento');

        cy.get('[data-cy=dormitorios]')
            .type(3);

        cy.get('[data-cy=banos]')
            .type(2);

        cy.get('[data-cy=link-foto]')
            .type('https://i.imgur.com/SialwiB.jpeg');

        cy.get('[data-cy="agregar-foto"]')
            .click();

        cy.get('[data-cy=ambientes]')
            .type(3);

        cy.get('[data-cy=metros-cuadrados]')
            .type(50);
        
        cy.get('[data-cy=capacidad-personas]')
            .type(3);

        cy.get('[data-cy=precio-input]')
            .type(180000);
        
        cy.get('[data-cy=moneda-select]')
            .select('ARS');

        cy.get('[data-cy=descripcion]')
            .type('Acogedor departamento para estudiantes con capacidad para tres personas. Este espacioso alojamiento cuenta con comodidades modernas y está ubicado en una zona tranquila y conveniente. Disfruta de una sala de estar luminosa, una cocina totalmente equipada y un ambiente ideal para estudiar. ¡Tu hogar estudiantil perfecto te espera!');
        
        cy.get('[data-cy="publicar-submit"]')
            .click();

        cy.wait(2000);
            
        // Publicar alojamiento tipo casa 
        cy.visit('http://localhost:5173/cuenta/alojamientos/nuevo');
        cy.wait(2000);

        cy.get('[data-cy=titulo-input]')
            .type('Espectacular casa para estudiantes con muy buena ubicación');

        cy.get('[data-cy=provincia-select]')
            .select('Buenos Aires');

        cy.get('[data-cy=direccion-input]')
            .type('San Martín 300');

        cy.get('[data-cy=tipo-alojamiento]')
            .select('casa');

        cy.get('[data-cy=dormitorios]')
            .type(4);

        cy.get('[data-cy=banos]')
            .type(2);

        cy.get('[data-cy=link-foto]')
            .type('https://i.imgur.com/SzouiKm.jpg');

        cy.get('[data-cy="agregar-foto"]')
            .click();

        cy.get('[data-cy=ambientes]')
            .type(6);

        cy.get('[data-cy=metros-cuadrados]')
            .type(120);

        cy.get('[data-cy=capacidad-personas]')
            .type(6);

        cy.get('[data-cy=precio-input]')
            .type(300000);

        cy.get('[data-cy=moneda-select]')
            .select('ARS');

        cy.get('[data-cy=descripcion]')
            .type("Acogedora casa para estudiantes con capacidad para seis personas. Este espacioso alojamiento cuenta con comodidades modernas y está ubicado en una zona tranquila y conveniente. Disfruta de una sala de estar luminosa, una cocina totalmente equipada y un ambiente ideal para estudiar. ¡Tu hogar estudiantil perfecto te espera!");

        cy.get('[data-cy="publicar-submit"]')
            .click();
    })
})