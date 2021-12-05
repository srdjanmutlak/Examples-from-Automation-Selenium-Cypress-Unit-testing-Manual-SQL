
describe('Testiranje upravljanja obavestenjima', () => {

    beforeEach(() => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.xpath("(//a[.='Stranica'])[1]").click()
    })

    it('Ciklus dodavanja, izmene i brisanja obavestenja', () => {

        cy.get('app-navbar-zgrada > .nav > :nth-child(1) > .nav-link').click()

        cy.get('#dodajObavestenje').click()

        cy.get('#tekstObavestenja')
            .type('U ponedeljak ce staviti nova vrataa')

        cy.get('#dodajObavestenje').click()

        cy.get('.toast-message')
            .should('contain', 'Obavestenje uspesno dodato!')

        cy.get('app-navbar-zgrada > .nav > :nth-child(1) > .nav-link').click()      //za povratak na spisak obavestenja

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'U ponedeljak ce staviti nova vrataa')

        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(1) > #izmeniObavestenje')    //izmena obavestenja
            .click()

        cy.get('#noviTekst')
            .contains('U ponedeljak ce staviti nova vrataa')        //biramo polje koje sadrzi nas tekst
            .type('{backspace}')    //brisemo jedan karakter


        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(4) > .operacije')
            .should('contain', 'brisi')
            .as('brisi')   //brisanje


        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(2) > .operacije').click().wait(500)    //{ force: true }  //potvrdi  //morala sam da stavim wait abog brisanja

        cy.get('.toast-message')
            .should('contain', ' Uspesno izmenjeno obavestenje')

        cy.get('@brisi').click()
        cy.get('.toast-message')
            .should('contain', ' Uspesno izbrisano obavestenje')
    })

    it('testiranje text area sa space i enter', () => {

        cy.get('app-navbar-zgrada > .nav > :nth-child(1) > .nav-link').click()

        cy.get('#dodajObavestenje').click()

        cy.get('#tekstObavestenja')
            .type('    ')           //kucamo samo spacove

        cy.get('#dodajObavestenje')
            .should('be.disabled')          //dugme za dodavanje bi trebalo da bude disabled

        cy.get('#tekstObavestenja')
            .clear()                    //clearujemo ono sto smo dodali
            .type('{enter}')
            .type('{enter}')            //ubacujemo enter 3 puta
            .type('{enter}')

        cy.get('#dodajObavestenje')
            .should('be.disabled')

        cy.get('#tekstObavestenja')
            .type('    ')

        cy.get('#dodajObavestenje')         //ubacujemo i par spaceva na enter
            .should('be.disabled')
    })

    it('Ciklus dodavanja, izmene i brisanja obavestenja', () => {

        cy.get('app-navbar-zgrada > .nav > :nth-child(1) > .nav-link').click()

        cy.get('#dodajObavestenje').click()

        cy.get('#tekstObavestenja')
            .type('@#$%^&*()!@#')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('{enter}')
            .type('Bla')

        cy.get('#dodajObavestenje').click()

        cy.get('.toast-message')
            .should('contain', 'Obavestenje uspesno dodato!')

        cy.get('app-navbar-zgrada > .nav > :nth-child(1) > .nav-link').click()      //za povratak na spisak obavestenja

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Bla')

        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > :nth-child(1) > :nth-child(4) > .operacije').click()
        
        cy.get('.toast-message')
            .should('contain', ' Uspesno izbrisano obavestenje')        //brisemo nakon dodavanja
    })

})