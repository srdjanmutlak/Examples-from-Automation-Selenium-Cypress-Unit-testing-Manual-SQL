
describe('Testiranje tacaka', () => {

    beforeEach(() => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.get(':nth-child(4) > a').click()
    })

    it('provera tacaka', () => {
        cy.get('.nav > :nth-child(2) > .nav-link').click()      //odlazak na tacke dnevnog reda

        cy.get('[routerlink="../ptdr/dodaj"] > .btn').click()

        cy.get('#tekstPtdr')
            .type('Predlazem da se ne prihvati prethodni predlog')
        cy.get('.center > .btn').click()        //potvrda unosa

        cy.get('.toast-message')
            .should('contain', 'Predlog tacke dnevnog reda uspesno dodat')

        cy.get('.nav > :nth-child(2) > .nav-link').click()      //odlazak na tacke dnevnog reda

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Predlazem da se ne prihvati prethodni predlog')               //potvrda dodavanja

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(1) > .operacije')    //izmena tacke
            .click()

        cy.get('#noviTekst')
            .contains('Predlazem da se ne prihvati prethodni predlog')        //biramo polje koje sadrzi nas tekst
            .type('!!!!')                               //kucamo dodatak

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(4) > .operacije')    //brisanje stavljamo ovde zbog detached DOM element
            .should('contain', 'brisi')
            .as('brisi')

        cy.xpath("(//span[.='potvrdi'])[1]").click()

        cy.get('.toast-message')
            .should('contain', ' Tacka uspesno izmenjena')

        //brisanje

        cy.xpath("(//span[contains(text(),'brisi')])[1]")
            .click({ force: true })

        cy.get('.toast-message')
            .should('contain', ' Tacka uspesno izbrisana')

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(1) > :nth-child(2) > .btn')
            .should('be.disabled')          //dodavanje predloga u izabranu skupstinu ne treba da bude dostupno
    })
})
