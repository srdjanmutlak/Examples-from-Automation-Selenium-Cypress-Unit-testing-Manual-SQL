describe('Reset Password Page', () => {                             // Primer promene lozinke sa jednim pozitivnim i jednim negativnim testom
    beforeEach(() => {                                              // Potrebno je dodati preostale negativne testove koje smo naveli na času 
        cy.login('admin@gmail.com', 'Bar5slova')   
        cy.get(".nav-link[href='/zgrade']").click()
        cy.url().should('be.equal', 'http://localhost:8080/zgrade')
     
    });

    it('Uspesno dodata zgrada', () => {
        cy.addBuilding('Subotica', 'Ivana Milljanova', '10', '5')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Vec postoji zgrada na toj adresi!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')   //biramo prikaz svih 

                    cy.xpath("//a[normalize-space()='Ivana Milljanova 10, Subotica']")
                        .should('contain', 'Ivana Milljanova 10, Subotica') 
                }
            })
    })

    it('Pokusaj dodavanja zgrade na istoj adresi', () => {
        cy.addBuilding('Subotica', 'Ivana Milljanova', '10', '5')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Vec postoji zgrada na toj adresi!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')   //biramo prikaz svih 

                    cy.xpath("//a[normalize-space()='Ivana Milljanova 10, Subotica']")
                        .should('contain', 'Ivana Milljanova 10, Subotica') 
            }
        })
    })

    it('Pokusaj kreiranja zgrade sa praznim poljima', () => {
        cy.get('#mesto').clear()

        cy.get('#ulica').clear()

        cy.get('#broj').clear()

        cy.get('#brojStanova').click()

        cy.xpath("//div[@class='row justify-content-md-center']").click()



        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[1]")
            .should('have.text', 'Ovo polje ne sme biti prazno!')
        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[2]")
            .should('have.text', 'Ovo polje ne sme biti prazno!')
        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[3]")
            .should('have.text', 'Ovo polje ne sme biti prazno!')
        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[4]")
            .should('have.text', 'Ovo polje ne sme biti prazno!')

        cy.get("button[type='submit']")
            .should('be.disabled')

    })

    it('Pokusaj dodavanja zgrade gde brojeve upisujemo slovima', () => {
        cy.addZgrada1('Beograd', 'Zmaj Jovina', 'sedam', 'osam')

        cy.xpath("//div[@class='row justify-content-md-center']").click()

        cy.get('#broj')
            .should('have.text', '')

        cy.get('#brojStanova')
            .should('have.text', '')

        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[1]")
            .should('have.text', 'Ovo polje ne sme biti prazno!')
        cy.xpath("(//div[.='Ovo polje ne sme biti prazno!'])[2]")
            .should('have.text', 'Ovo polje ne sme biti prazno!')

        cy.get("button[type='submit']")
            .should('be.disabled')

      


    })

    it('Samo space u poljima mesto i ulica', () => {        //THIS SHOULD NOT BE POSSIBLE 
        cy.addBuilding(' ', ' ', '754', '7')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Mora postojati tekst u prvom i drugom polju!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')   //biramo prikaz svih 

                    cy.xpath("//a[normalize-space()='754,']")
                        .should('contain', '754') 
            }
        })


    })
    
    it('Polje broj sa vise od 3 karaktera', () => {
        cy.addBuilding('Valjevo', 'JNA', '1234', '1234')

        cy.get('.toast-message')
            .then($alert => {
                if ($alert.text().includes('Vec postoji zgrada na toj adresi!')) {
                    return $alert
                } else {
                    cy.contains('Pregled').click()
                    cy.get('#prikaz').select('50')

                    cy.xpath("//a[normalize-space()='JNA 123, Valjevo']")
                        .should('contain', 'JNA 123, Valjevo')
                        .and('not.contain', '1234') //it should still have only 3 characters
                    
                    cy.xpath("//th[normalize-space()='123']")
                        .should('contain', '123')
                        .and('not.contain', '1234') //it should still have only 3 characters
                    
                    
                }
            })
    })

    it('Pokusaj dodavanja zgrade gde su oba broja nula', () => {
        cy.addZgrada1('Novi Sad', 'Dunavska', '0', '0')


        cy.xpath("(//div[.='Broj mora biti pozitivan!'])[1]")
            .should('have.text', 'Broj mora biti pozitivan!')
        cy.xpath("(//div[.='Broj mora biti pozitivan!'])[2]")
            .should('have.text', 'Broj mora biti pozitivan!')

        cy.get("button[type='submit']")
            .should('be.disabled')

      


    })

})
