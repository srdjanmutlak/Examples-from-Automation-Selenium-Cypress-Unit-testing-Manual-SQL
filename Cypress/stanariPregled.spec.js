
describe('Testiranje search polja u stanarima', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Stanari').click()
        cy.get(':nth-child(2) > .btn > b').click()
        cy.get('#prikaz').select('50')

    })

    it('Provera pretrage', () => {
        cy.get('#filter')
            .type('Steva')       //kucamo samo ime

        cy.get('.row > .btn').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Steva')
            .should('have.length', 1)      

        cy.get('#filter').clear()
            .type('nikola@gmail.com')       //kucamo samo email

        cy.get('.row > .btn').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'nikola@gmail.com')
            .should('have.length', 1)     
            
        cy.get('#filter').clear()
            .type('Jankovic')       //kucamo samo prezime

        cy.get('.row > .btn').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Jankovic')
            .should('have.length', 1)   
            
        cy.get('#filter').clear()
            .type('kovic')       //kucamo samo deo prezimena

        cy.get('.row > .btn').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Jankovic')
            .should('contain', 'Marko Markovic')
            .should('have.length', 2) 
            
        cy.get('#filter').clear()
            .type('kola@gmail.com')       //kucamo samo deo prezimena

        cy.get('.row > .btn').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'nikola@gmail.com')
            .should('have.length', 1)
    })

    it('Provera praznog polja', () => {

        cy.get('#filter')
            .type('Srdjan')       //unosimo nesto u pretragu

        cy.get('.row > .btn').click()       //klik na dugme

        cy.get('#filter')
            .clear()        //brisemo to iz pretrage   

        cy.get('.row > .btn').click()


        cy.get('table')
            .find('tbody>tr')
            .should('have.length', 6)      //svi napravljeni elementi bi trebali da budu tu
    })

    it('Odlazak na stranicu stanara', () => {

        cy.get('#filter')
            .type('Gospodin Predsednik')       

        cy.get('.row > .btn').click() 

        cy.get('table')
        .find('tbody>tr>td>a').contains('Gospodin Predsednik')
        .click()

        cy.get('.col-md-8 > :nth-child(2)')
            .should('contain', 'Gospodin Predsednik')
    })
})
