describe('Promena lozinke', () => {


    it('Pozitivna promena lozinke', () => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.contains('Promena lozinke').click()


        cy.changePass('Bar5slova', 'Bar6slova', 'Bar6slova')  //izmena lozinke

        cy.get('.center > .btn')        // dugme smo ostavili ovde da bi mogli da proveravamo da li je disabled ili ne u narednim testovima
            .click()

        cy.get(':nth-child(2) > .btn').click()  //izloguj se

        cy.login('predSkup@gmail.com', 'Bar6slova')     //ponovo se ulogujemo preko novog korisnika

        cy.url().should('contain', 'pocetna')
    })

    it('Pogresna stara lozinka', () => {

        cy.login('predSkup@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar50slova', 'Bar6slova', 'Bar6slova')

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Pogresna lozinka!')
    })

    it('Pogresna potvrda lozinka', () => {

        cy.login('predSkup@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Bar60slova', 'Bar600slova')     //pogresna potvrda lozinke

        cy.get('.center > .btn')
            .should('be.disabled')

        cy.get('.invalid-feedback')
            .should('contain', 'Lozinke se ne poklapaju!')
    })


    it('Granicne vrednosti lozinka 5 slova', () => {

        cy.login('predSkup@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Bar5s', 'Bar5s')

        cy.get('.center > .btn')
            .should('be.disabled')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka! Pogledajte napomenu.')
    })

    it('Granicne vrednosti lozinka 6 slova', () => {

        cy.login('predSkup@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Bar5sl', 'Bar5sl')

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Lozinka uspesno izmenjena! ')

    })

    it('Granicne vrednosti lozinka od 7 slova', () => {

        cy.login('predSkup@gmail.com', 'Bar5sl')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar5sl', 'Bar5slo', 'Bar5slo')

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Lozinka uspesno izmenjena! ')

    })

    after(() => {

        cy.login('predSkup@gmail.com', 'Bar5slo')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar5slo', 'Bar5slova', 'Bar5slova')

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Lozinka uspesno izmenjena! ')
    })
        
})