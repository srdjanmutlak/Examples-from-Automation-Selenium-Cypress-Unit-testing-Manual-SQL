/*
* 1. Testirati promenu lozinke:
• Login kao stanar (marko@gmail.com)
• Preći na tab za Promenu lozinke.
• Napisati testove za formu za promenu lozinke.
 */

describe('Testiranje promene lozinke', () => {



    it('Uspesna promena lozinke', () => {
        cy.login('marko@gmail.com', 'Bar5slova');           //login kao marko
        cy.contains('Promena lozinke').click()              //prelazak na stranu promena lozinke
        cy.url().should('include', 'promenaLozinke')


        cy.changePass('Bar5slova', 'Bar6slova', 'Bar6slova')  //izmena lozinke

        cy.get('.center > .btn')        // dugme smo ostavili ovde da bi mogli da proveravamo da li je disabled ili ne u narednim testovima
            .click()

        cy.get(':nth-child(2) > .btn').click()  //izloguj se

        cy.login('marko@gmail.com', 'Bar6slova')     //ponovo se ulogujemo preko novog korisnika

        cy.url().should('contain', 'pocetna')           //asertacija da se url promenio
    })

    it('Pogresna stara lozinka', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar50slova', 'Bar6slova', 'Bar6slova')

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Pogresna lozinka!')
    })

    it('Pogresna potvrda lozinka', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Bar60slova', 'Bar600slova')     //pogresna potvrda lozinke

        cy.get('.center > .btn')
            .should('be.disabled')          //dugme za cuvanje nove ozinke bi trebalo biti disabled

        cy.get('.invalid-feedback')
            .should('contain', 'Lozinke se ne poklapaju!')
    })

    it('Neispravna lozinka - bez velikog slova', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'bar60slova', 'bar60slova')     //bez velikog slova

        cy.get('.center > .btn')
            .should('be.disabled')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka! Pogledajte napomenu.')
    })
    it('Neisprava lozinka - bez broja', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Barslova', 'Barslova')     //bez broja

        cy.get('.center > .btn')
            .should('be.disabled')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka! Pogledajte napomenu.')

    })
    
    it('Neisprava lozinka - bez malih slova', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'BAR6SLOVA', 'BAR6SLOVA')     //bez malih slova

        cy.get('.center > .btn')
            .should('be.disabled')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka! Pogledajte napomenu.')

    })

    it('Granicne vrednosti lozinka 5 slova', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Bar5s', 'Bar5s')

        cy.get('.center > .btn')
            .should('be.disabled')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka! Pogledajte napomenu.')
    })

    it('Granicne vrednosti lozinka 6 slova', () => {

        cy.login('marko@gmail.com', 'Bar6slova')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar6slova', 'Bar5sl', 'Bar5sl')

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Lozinka uspesno izmenjena! ')

    })

    it('Granicne vrednosti lozinka od 7 slova', () => {

        cy.login('marko@gmail.com', 'Bar5sl')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar5sl', 'Bar5slo', 'Bar5slo')       //nova lozinka sa 7 karaktera

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Lozinka uspesno izmenjena! ')

    })

    after(() => {

        cy.login('marko@gmail.com', 'Bar5slo')
        cy.contains('Promena lozinke').click()

        cy.changePass('Bar5slo', 'Bar5slova', 'Bar5slova')      //vracamo lozinku na staro da bi mogli ponovo da pokrenemo testove

        cy.get('.center > .btn')
            .click()

        cy.get('.toast-message')
            .should('contain', 'Lozinka uspesno izmenjena! ')
    })
        
})