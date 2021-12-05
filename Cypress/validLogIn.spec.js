describe('Valid login tests', () => {
    it('Admin Login Test', () => {
        
        cy.login('admin@gmail.com', 'Bar5slova')
        cy.get('.btn.btn-secondary').should('have.text', 'Izlogujte se')
        cy.url().should('be.equal', 'http://localhost:8080/pocetna')

        cy.get(".nav-link.active").invoke('text').then((text) => {
            expect(text.replace(/\u00a0/g, ' ')).equal('admin@gmail.com   ');
        });
        


    })

    it('PredSkup Login Test', () => {
        
        cy.login('predSkup@gmail.com', 'Bar5slova')
        cy.get('.btn.btn-secondary').should('have.text', 'Izlogujte se')
        cy.url().should('be.equal', 'http://localhost:8080/pocetna')

        cy.get(".nav-link.active").invoke('text').then((text) => {
            expect(text.replace(/\u00a0/g, ' ')).equal('predSkup@gmail.com   ');
        });
        


    })

    it('Stanar Login Test', () => {
        
        cy.login('marko@gmail.com', 'Bar5slova')
        cy.get('.btn.btn-secondary').should('have.text', 'Izlogujte se')
        cy.url().should('be.equal', 'http://localhost:8080/pocetna')

        cy.get(".nav-link.active").invoke('text').then((text) => {
            expect(text.replace(/\u00a0/g, ' ')).equal('marko@gmail.com   ');
        });
        
    })


})