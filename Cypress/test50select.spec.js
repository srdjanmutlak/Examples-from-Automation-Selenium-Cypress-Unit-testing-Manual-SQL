describe('automatska registracija 52 zgrade', () => {
    
    it('pravimo 52 registracije uz pomoc komande request', () => {
    
        cy.loginRequest('admin@gmail.com', 'Bar5slova')

        for (var i=1; i<=52; i++) {
            cy.registerFirm("Jovana Jovanovica", "22222222222", i+"example@gmail.com", "Bar10slova","Uradi Sam")
            }


    })

})

describe('Testiranje dropdown, 50 ,25, 10, 5', () => {
    
    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Firme').click()
        cy.contains('Pregled').click()
    })

    it('Selektijemo prikaz od 5 i gledamo da li nam stvarno prikazuje 5 redova', () => {

        cy.get('#prikaz').select('5')

        cy.get('tbody>tr')
            .should('have.length', 5)

        cy.xpath("//button[normalize-space()='2']").click() //prelazak na drugu stranu

        cy.get('tbody>tr')
            .should('have.length', 5)

        cy.get(':nth-child(5) > .btn').click()      //treca strana

        cy.get('tbody>tr')
            .should('have.length', 5)


        cy.xpath("//button[normalize-space()='>>']").click()  //prelazak na poslednju stranu

        cy.get('tbody>tr')
            .should('have.length.lte', 5)
    })

    it('Selektijemo prikaz od 10 i gledamo da li nam stvarno prikazuje 10 redova', () => {

        cy.get('#prikaz').select('10')

        cy.get('tbody>tr')
            .should('have.length', 10)


        
    })

    it('Seletujemo prikaz od 25 elemenata', () => {

        cy.get('#prikaz').select('25')

        cy.get('tbody>tr')
            .should('have.length', 25)


    })

    it('Selektujemo prikaz od 50 elemenata', () => {

        cy.get('#prikaz').select('50')

        cy.get('tbody>tr')
            .should('have.length', 50)


    })
    

})