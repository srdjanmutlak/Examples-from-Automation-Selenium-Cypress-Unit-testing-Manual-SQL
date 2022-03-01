describe('Testiranje dodavanja, izmene i brisanja kvara', () => {

    beforeEach(() => {
        cy.login('marko@gmail.com', 'Bar5slova'); 

        cy.xpath("(//a[contains(text(),'Stranica')])[1]").click()
        cy.xpath("//a[normalize-space()='Kvarovi']").click()      

    })

    it('Testiramo dodavanje kvara', () => {

        cy.get("button[class='btn']").click()

        cy.get('#mesto')
            .clear()
            .type('Kod ulaznih vrata')

        cy.get('#opis')
            .clear()
            .type('Komsija dosao pijan i polomio staklo')

        cy.get("#odgovorno_lice").click()
        cy.get("#button_4").click()
        cy.get("#submit").click()

        cy.get('.toast-message')
            .should('have.text', ' Kvar uspesno dodat ')

        cy.xpath("//a[normalize-space()='Sastanci skupstine']").click()
        cy.xpath("//a[normalize-space()='Kvarovi']").click() 

        cy.xpath("(//span[@id='opisKvara'])[1]")
            .should('have.text', 'Komsija dosao pijan i polomio staklo')

    })



    it('Brisanje Komentara', () => {

        cy.xpath("(//span[.='brisi'])[1]").click()     //brisemo komentar

        cy.get('.toast-message')
            .should('have.text', ' Uspesno izbrisan kvar ')

        cy.xpath("//span[@id='opisKvara']").should('not.have.value', 'Komsija dosao pijan i polomio staklo')
    })

    it('Proveravamo unosenje entera i spejsova', () => {

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