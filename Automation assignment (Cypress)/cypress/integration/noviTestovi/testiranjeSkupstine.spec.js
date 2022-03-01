describe('Testiranje skupstine', () => {

    beforeEach(() => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.get(':nth-child(4) > a').click()
    })
    it('Testiramo dodavanje skupstine', () => {

        cy.get('.nav > :nth-child(3) > .nav-link').click()

        cy.get('[routerlink="../sastanak/zakazi"] > .btn').click()      //klik na dodavanje

        cy.get('[name="pocetakSkupstine"]')
            .clear()                            //pocetak sastanka
            .type('2022-12-11T17:30')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2022-12-11T19:00')

        cy.contains('Potvrdi').click()

        cy.get('.toast-message')
            .should('contain', ' Sastanak uspesno zakazan')
    })

    it('Testiramo dodavanje iste skupstine', () => {

        cy.get('.nav > :nth-child(3) > .nav-link').click()

        cy.get('[routerlink="../sastanak/zakazi"] > .btn').click()      //klik na dodavanje

        cy.get('[name="pocetakSkupstine"]')
            .clear()                            //pocetak sastanka
            .type('2022-12-11T17:30')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2022-12-11T19:00')

        cy.contains('Potvrdi').click()

        cy.get('.toast-message')
            .should('contain', ' Sastanak uspesno zakazan') //ovo ne bi smelo da uspe!
    })

    it('Testiramo dodavanje skupstine u proslosti', () => {

        cy.get('.nav > :nth-child(3) > .nav-link').click()

        cy.get('[routerlink="../sastanak/zakazi"] > .btn').click()      //klik na dodavanje

        cy.get('[name="pocetakSkupstine"]')
            .clear()                            //pocetak sastanka
            .type('2021-12-03T10:10')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2021-12-03T11:10')

        cy.contains('Potvrdi').should('be.disabled')


    })

    it('Testiramo upisivanje prvo veceg datuma a onda manjeg u nekom buducem roku', () => {

        cy.get('.nav > :nth-child(3) > .nav-link').click()

        cy.get('[routerlink="../sastanak/zakazi"] > .btn').click()      //klik na dodavanje

        cy.get('[name="pocetakSkupstine"]')
            .clear()                            //pocetak sastanka
            .type('2022-12-11T19:00')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2022-12-11T17:30')

        cy.contains('Potvrdi').should('be.disabled')


    })

    it('Testiramo upisivanje nemoguce dugacku skupstinu sa pocetkom u dalekoj proslosti', () => {

        cy.get('.nav > :nth-child(3) > .nav-link').click()

        cy.get('[routerlink="../sastanak/zakazi"] > .btn').click()      //klik na dodavanje

        cy.get('[name="pocetakSkupstine"]')
            .clear()                            //pocetak sastanka
            .type('1800-12-11T19:00')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2022-12-11T17:30')

        cy.contains('Potvrdi').should('be.disabled')


    })

})