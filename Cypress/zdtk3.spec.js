/**
 * 3. Testirati dodavanje i brisanje ponudjenih odgovora, na tip pitanja: Stanar pitanje, u okviru
ankete.
• Ulogovati se kao predsednik skupštine (predSkup@gmail.com, Bar5slova).
• Otvoriti stranicu zgrade u kojoj predsednik skupštine živi.
• Otvoriti tab Sastanci skupstine.
• Kreirati novi sastanak skupstine (bilo koji datum i vreme)
• Otvoriti tab Predlozi tacke dnevnog reda
• Dodati prvu tacku dnevnog reda u kreiranu skupstinu
• Otvoriti tab Sastanci skupstine.
• Otvoriti pregled tačaka dnevnog reda na kreiranoj skupštini
• Otvoriti anketu na prvoj tački dnevnog reda
• Izabrati Dodaj pitanje
• Izabrati kao tip pitanja Stanar pitanje
• Testirati dodavanje i brisanje Marka Markovica i Janka Jankovica kao nove opcije
 */


describe('Testiranje dodavanje i brisanje ponudjenih odovora', () => {

    beforeEach(() => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.get(':nth-child(4) > a').click()
    })

    it('Testiranje uspesno', () => {
        cy.get('.nav > :nth-child(3) > .nav-link').click()      //sastanci

        cy.get('[routerlink="../sastanak/zakazi"] > .btn').click()      //klik na dodavanje

        cy.get('[name="pocetakSkupstine"]')
            .clear()                            //pocetak sastanka
            .type('2021-04-10T17:30')

        cy.get('[name="zavrsetakSkupstine"]')
            .clear()                            //kraj sastanka
            .type('2021-04-10T19:00')

        cy.get("button[type='button']").click()

        cy.get('.toast-message')
            .should('contain', 'Sastanak uspesno zakazan')

        cy.get('.nav > :nth-child(2) > .nav-link').click()      //idemo na tacke

        cy.get('.custom-select')
            .select('17:30 10.04.2021 - 19:00 10.04.2021')      //selektujemo skupstinu koju smo dodali

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(1) > :nth-child(2) > .btn').click()

        cy.get('.toast-message')
            .should('contain', 'Tacka uspesno dodata u skupstinu')

        cy.get('.nav > :nth-child(3) > .nav-link').click()      //povratak na sastanke

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(5) > td > .tacke > .ng-star-inserted > .operacije').click() //gledamo tacke

        cy.get('.anketa > a > .operacije').click()       //gledamo anketu

        cy.get('.col-md-3 > .btn').click() //dodajemo pitanje

        cy.get('.col-md-12 > .col-form-label > .form-control')      //unosimo random tekst za pitanje
            .type('za ili protiv')

        cy.get('#radio2').click()       //pitanje stanar

        cy.get(':nth-child(4) > .col-md-8 > .col-form-label > .custom-select')      //dodajemo marka
            .select('Marko Markovic - marko@gmail.com')
        cy.get(':nth-child(4) > .col-md-4 > .btn')
            .click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Marko Markovic')       //potvrdjujemo da je marko tu

        cy.get(':nth-child(3) > .btn').click()          //uklanjamo marka


        cy.get(':nth-child(4) > .col-md-8 > .col-form-label > .custom-select')      //dodajemo Janka
            .select('Janko Jankovic - janko@gmail.com')
        cy.get(':nth-child(4) > .col-md-4 > .btn')
            .click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Janko Jankovic')       //potvrdjujemo da je Janko tu

        cy.get(':nth-child(3) > .btn').click()          //uklanjamo Janka

    })
})