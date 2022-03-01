describe('Testiranje prosledjivanja kvara', () => {


    it('test na kom dodajemo datu instituciju', () => {

        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Institucije').click()

        cy.addInstitution('opstina@gmail.com', 'Bar6slova', 'Opstina', 'Novi Sad', 'Bulevar Oslobodjenja', '11', '1122334455')

        cy.get('.col-lg-9 > .btn-primary').click()           //zakomentarisano u suportu zbog negativnih testova

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali instituciju')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled institucija

        cy.get('#filter')   //u polje pretraga unosime email
            .type('opstina@gmail.com')

        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'opstina@gmail.com')     //proveravamo da li nam tabela sadrzi dati email

        cy.get(".btn.btn-secondary").click()

    })

    it('test polje za pretragu u dijalogu za izbor odgovornog lica', () => {

        cy.login('marko@gmail.com', 'Bar5slova');
        cy.xpath("(//a[contains(text(),'Stranica')])[1]").click()
        cy.xpath("//a[normalize-space()='Kvarovi']").click()
        cy.xpath("(//span[contains(text(),'pogledaj')])[2]").click()

        cy.xpath("//span[contains(text(),'izmeni odgovorno lice')]").click()

        
            cy.get("input[placeholder='Pretraga']")
                .type('Steva')       //kucamo samo ime
    
    
            cy.get('table')
                .find('tbody>tr')
                .should('contain', 'Steva')
             //   .should('have.length', 1)      
    
            cy.get("input[placeholder='Pretraga']").clear()
                .type('nikola@gmail.com')       //kucamo samo email
    
    
            cy.get('table')
                .find('tbody>tr')
                .should('contain', 'nikola@gmail.com')
               // .should('have.length', 1)     
                
            cy.get("input[placeholder='Pretraga']").clear()
                .type('Jankovic')       //kucamo samo prezime
    
    
            cy.get('table')
                .find('tbody>tr')
                .should('contain', 'Jankovic')
               // .should('have.length', 1)   
                
            cy.get("input[placeholder='Pretraga']").clear()
                .type('kovic')       //kucamo samo deo prezimena
    
    
            cy.get('table')
                .find('tbody>tr')
                .should('contain', 'Jankovic')
                .should('contain', 'Marko Markovic')
              //  .should('have.length', 2) 
                
            cy.get("input[placeholder='Pretraga']").clear()
                .type('kola@gmail.com')       //kucamo samo deo prezimena
    
    
            cy.get('table')
                .find('tbody>tr')
                .should('contain', 'nikola@gmail.com')
             //   .should('have.length', 1)
        })
    

        it('prihvatanje opstine', () => {

            cy.get("input[placeholder='Pretraga']").clear()
                .type('Opstina') 



            cy.xpath("//span[contains(text(),'izmeni odgovorno lice')]").click()

            cy.xpath("(//button[.='Prihvati'])[1]").click()

            cy.get('.toast-message')
            .should('have.text', ' Odgovorno lice uspesno izmenjeno ')

            cy.get(".btn.btn-secondary").click()


        })


        it('prosledivanje kvara', () => {

        cy.login('opstina@gmail.com', 'Bar6slova');

        cy.contains('Dodeljeni kvarovi').click()

        cy.xpath("//span[.='pogledaj']").click()
        cy.contains('Kvarovi').click()
        cy.xpath("(//span[.='pogledaj'])[2]").click()
        cy.get("#tekstKomentara").click()
        .type('Odbijeno')
        cy.get("#button_komentar").click()

        cy.get('.toast-message')
            .should('have.text', ' Komentar uspesno dodat ')

        cy.xpath("//span[contains(text(),'prosledi kvar')]").click()

        cy.get('#button_4').click()

        cy.get('.toast-message')
            .should('contain', ' Odgovorno lice uspesno izmenjeno ')

        cy.contains('Dodeljeni kvarovi').click()

        cy.get('#kvar_1').should('not.exist');


        cy.get(".btn.btn-secondary").click()
        








    })

})
