var random = Math.random().toString(36).slice(-5);  //random string generator za email
var email = random + '@gmail.com'


describe('Testiranje forme za dodavanje stanara', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Stanari').click()
    })

     it('Uspesno dodavanje', () => {

         cy.addStanara(email, 'Bar5slova', 'Srdjan', 'Markovic')

         cy.get('.toast-message')
             .should('contain', 'Uspesno ste registrovali stanara!')

         cy.contains('Pregled').click()
         cy.get('#filter').type(email)
         cy.get('.row > .btn').click()   //biramo prikaz svih 

         cy.get('table')
             .find('tbody>tr')
             .should('contain', email)
     })

     it('Dodavanje korisnika sa vec postojiecim emailom', () => {

         cy.addStanara(email, 'Bar5slova', 'Srdjan', 'Markovic')

         cy.get('.toast-message')
             .should('contain', 'E-mail adresa: ' + email + ' je zauzeta!')

     })

    it('ostavljanje praznih polja', () => {

        cy.get('#email').clear()

        cy.get('#lozinka').clear()

        cy.get('#ime').clear()

        cy.get('#prezime').clear()

        cy.get('.invalid-feedback')
            .should('contain', 'Ovo polje ne sme biti prazno!')

        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')
    })

    it('Neispravan email', () => {

        cy.get('#email')
            .clear()
            .type('aaaaaa')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a')        //samo sa @

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.')       //sa tackom

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.a')      //sa jednim karakterom posle tacke

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.aa')      //sa dva karaktera posle tacke i ovo bi trebalo da prodje

        cy.get('.invalid-feedback')
            .should('not.be.exist')
    })

    it('Neispravna lozinka', () => {

        cy.get('#lozinka')
            .clear()
            .type('aaaaaaa')     //samo mala slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('AAAAAAA')        //samo velika slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('1111111')       //samo brojevi

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('aaaa111')      //bez velikog slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('AAAA111')      //bez malih slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('aaaaAAA')      //bez  BROJEVA

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')

        //---------------------------------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('Bar5s')      //samo 5 karaktera

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //---------------------------------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('Bar5sl')      //sa 6 karaktera

        cy.get('.invalid-feedback')
            .should('not.be.exist')
        //---------------------------------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('Bar5slo')      //sa 7 karaktera

        cy.get('.invalid-feedback')
            .should('not.be.exist')
    })

    it('Saljemo neispravnu lozinku', () => {

        cy.get('#email')
            .clear()
            .type(email)

        cy.get('#lozinka')
            .clear()
            .type('bar5slova')

        cy.get('#ime')
            .clear()
            .type('ime')

        cy.get('#prezime')
            .clear()
            .type('prezime')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')

        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')
    })
    it('Saljemo neispravan email', () => {

        cy.get('#email')
            .clear()
            .type('email@email')

        cy.get('#lozinka')
            .clear()
            .type('Bar5slova')

        cy.get('#ime')
            .clear()
            .type('ime')

        cy.get('#prezime')
            .clear()
            .type('prezime')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')

        cy.get('.col-lg-9 > .btn-primary')
            .should('be.disabled')
    })
})
