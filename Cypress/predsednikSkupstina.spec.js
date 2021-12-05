
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
            .type('2021-04-10T17:30')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2021-04-10T19:00')

        cy.get('.center > .btn').click()

        cy.get('.nav > :nth-child(3) > .nav-link').click()      //povratak na sastanke

        cy.get('.toast-message')
            .should('contain', 'Sastanak uspesno zakazan')

        cy.get('.nav > :nth-child(2) > .nav-link').click()      //idemo na tacke

        cy.get('.custom-select')
            .select('17:30 10.04.2021 - 19:00 10.04.2021')      //selektujemo skupstinu koju smo dodali

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(1) > :nth-child(2) > .btn').click()

        cy.get('.toast-message')
            .should('contain', 'Tacka uspesno dodata u skupstinu')

        cy.get('.nav > :nth-child(3) > .nav-link').click()      //povratak na sastanke

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(5) > td > .tacke > .ng-star-inserted > .operacije').click()  //gledamo tacke

        cy.get('.anketa > a > .operacije').click()       //gledamo anketu

        cy.get('.col-md-3 > .btn').click() //dodajemo pitanje

        cy.get('.col-md-12 > .col-form-label > .form-control')
            .type('za ili protiv')

        cy.get('#radio2').click()       //pitanje stanar


        cy.get(':nth-child(4) > .col-md-8 > .col-form-label > .custom-select')
            .select('Gospodin Predsednik - predSkup@gmail.com')
        cy.get(':nth-child(4) > .col-md-4 > .btn')
            .click()

        cy.get('.col-md-6 > .btn').should('be.disabled')        //ovo ne bi trebalo ovako  NE RADI  
    })

    it('Provera ankete vec zavrsenog sastanka', () => {

        cy.get('.nav > :nth-child(3) > .nav-link').click()  //povratak na sastanke

        cy.get(':nth-child(6) > .row > table > tbody > :nth-child(5) > td > .zapisnik > a > .operacije').click()        //gledamo anketu vec zavrsenog sastanka

        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(4) > td > .anketa > a > .operacije').click()      //gledamo anketu

        cy.get('.col-md-3 > .btn').click()      //gledamo glasove
        cy.go('back')

        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(4) > td > :nth-child(2) > :nth-child(1) > .operacije').click()

        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > .odluka')
            .clear()
            .type('Odluka je prihvacena')

        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(4) > td > :nth-child(2) > :nth-child(2) > .operacije').click()        //potvrdjujemo  odluku

        cy.get('.toast-message')
            .should('contain', 'Odluka je doneta')
    })

})
//mogla sam i da ubacim ono find da mi u tabeli bude samo jedan sastanak