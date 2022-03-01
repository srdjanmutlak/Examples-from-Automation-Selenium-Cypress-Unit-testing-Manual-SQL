
describe('Testiranje search polja u stanarima', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Stanari').click()
        cy.get(':nth-child(2) > .btn > b').click()
        cy.get('#prikaz').select('50')

    })

    it('Provera pretrage', () => {
        cy.get('#filter')
            .type('Kaca')       //kucamo samo ime

        cy.get('.row > .btn').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'Kaca')
            .should('have.length', 10)      //manuelno izbrojan broj kaca :D
    })

    it('Provera praznog polja', () => {

        cy.get('#filter')
            .type('Kaca')       //unosimo nesto u pretragu

        cy.get('.row > .btn').click()       //klik na dugme

        cy.get('#filter')
            .clear()        //brisemo to iz pretrage   

        cy.get('.row > .btn').click()


        cy.get('table')
            .find('tbody>tr')
            .should('have.length', 15)      //svi napravljeni elementi bi trebali da budu tu
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
