describe('Testiranje skupstine', () => {

    beforeEach(() => {
        cy.login('predSkup@gmail.com', 'Bar5slova');
        cy.get(':nth-child(4) > a').click()
    })

    it('Testiramo dodavanje kvara', () => {

        cy.get(':nth-child(4) > .nav-link').click()     //odlazak na kvarove

        cy.get('.checkbox > label').click()     //trazimo prikaz i popravljenih

        cy.get('#dodaj > .btn').click()     //dodajemo novi kvar

        cy.get('#mesto')
            .clear()
            .type('hodnik')

        cy.get('#opis')
            .clear()
            .type('ograda je pukla')

        cy.get('#odgovorno_lice').click()       //biramo odgovorno lice

        cy.get('#prikaz').select('50')

            

        cy.get('#button_6').click({ force: true })

        cy.get('#submit').click()

        cy.get('.toast-message')
        .should('contain', 'Kvar uspesno dodat')

        cy.xpath("//a[normalize-space()='Sastanci skupstine']").click()
        cy.xpath("//a[normalize-space()='Kvarovi']").click() 

        cy.xpath("(//span[@id='opisKvara'])[1]")
            .should('have.text', 'ograda je pukla')
    })

    it('Brisanje Komentara', () => {

        cy.get(':nth-child(4) > .nav-link').click()     //odlazak na kvarove

        cy.get('.checkbox > label').click()     //trazimo prikaz i popravljenih

        cy.xpath("(//span[.='brisi'])[1]").click()     //brisemo komentar

        cy.get('.toast-message')
            .should('have.text', ' Uspesno izbrisan kvar ')

        cy.xpath("//span[@id='opisKvara']").should('not.have.value', 'ograda je pukla')
    })

    it('Proveravamo unosenje entera i spejsova', () => {

        cy.get(':nth-child(4) > .nav-link').click()     //odlazak na kvarove

        cy.get('.checkbox > label').click()     //trazimo prikaz i popravljenih

        cy.get("button[class='btn']").click()

        cy.get('#mesto')
            .clear()
            .type('    ')
            .type('{enter}')
            .type('{enter}')            
            .type('{enter}')

        cy.get('#opis')
            .clear()
            .type('    ') 
            .type('{enter}')
            .type('{enter}')            
            .type('{enter}')          

        cy.get('#submit')
            .should('be.disabled')          //dugme za dodavanje bi trebalo da bude disabled

        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[1]").should('have.text', 'Ovo polje ne sme biti prazno!')
        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[2]").should('have.text', 'Ovo polje ne sme biti prazno!')
    })

})
//  