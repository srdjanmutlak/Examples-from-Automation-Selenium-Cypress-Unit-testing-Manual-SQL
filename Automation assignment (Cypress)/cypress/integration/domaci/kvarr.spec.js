/**
 * 5. Testirati dodavanje, izmenu i brisanje komentara u okviru kvarova.
• Ulogovati se kao Marko (marko@gmail.com, Bar5slova).
• Otvoriti stranicu zgrade u kojoj Marko živi.
• Preći na tab za kvarove.
• Otvoriti stranicu za kvar koji je kreiran od strane ulogovanog korisnika.
• Napisati testove za dodavanje, izmenu i brisanje komentara.
• Logout.
 */

describe('Testiranje dodavanja, izmene i brisanja kvara', () => {

    beforeEach(() => {
        cy.login('marko@gmail.com', 'Bar5slova');

        cy.get('#zgradaStanuje>tbody>tr>:nth-child(4)>a').click()       //odlazak na zgradu
        cy.get(':nth-child(4) > .nav-link').click() //odlazak na kvarove

        cy.get('.pogledaj_1 > .operacije').click()  //komentari
    })

    it('Testiramo dodavanje kvara', () => {

        cy.get('#tekstKomentara')
            .clear()
            .type('Jos niste popravili, prijavio sam pre 5 godinaaa')

        cy.get('#button_komentar').click()

        cy.get('.komentar > .row')
            .should('contain', 'Jos niste popravili, prijavio sam pre 5 godinaaa')
    })

    it('Izmena komentara', () => {

        cy.get('.kom_1_izmeni > .operacije').click()        //izmena

        cy.get('#kom_1_novi_tekst')     //novi input
            .type('{backspace}')        //brisemo dva karaktera i stavljamo !!
            .type('{backspace}')
            .type('!!')

        cy.get('.kom_1_potvrdi > .operacije').click()

        cy.get('.toast-message')
            .should('contain', 'Komentar uspesno izmenjen')

        cy.get('.komentar > .row')
            .should('contain', 'Jos niste popravili, prijavio sam pre 5 godina!!')
    })

    it('Brisanje Komentara', () => {

        cy.get('.kom_1_brisi > .operacije').click()     //brisemo komentar

        cy.get('.toast-message')
            .should('contain', 'Komentar uspesno izbrisan')
    })

    it('Proveravamo unosenje entera i spejsova', () => {

        cy.get('#tekstKomentara')
            .type('    ')           //kucamo samo spacove

        cy.get('#button_komentar')
            .should('be.disabled')          //dugme za dodavanje bi trebalo da bude disabled

        cy.get('#tekstKomentara')
            .clear()                    //clearujemo ono sto smo dodali
            .type('{enter}')
            .type('{enter}')            //ubacujemo enter 3 puta
            .type('{enter}')

        cy.get('#button_komentar')      //ne bi trebalo da mozemo da kliknemo
            .should('be.disabled')

        cy.get('#tekstKomentara')
            .type('    ')

        cy.get('#button_komentar')         //ubacujemo i par spaceva na enter
            .should('be.disabled')
    })
})
//