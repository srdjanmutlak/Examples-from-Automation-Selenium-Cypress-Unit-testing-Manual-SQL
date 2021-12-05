describe('Testiranje pretrage zgrada', () => {
    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Zgrade').click()
        cy.contains('Pregled').click()
        cy.get('#prikaz').select('50')
    })

    

    it('Pretraga zgrade koja vec postoji uneli', () => {


        cy.get('.row > .btn').click()

        cy.xpath("//a[normalize-space()='Boska Buhe 42, Novi Sad']")
        .should('have.text', 'Boska Buhe 42, Novi Sad')
    })

    it('pretraga sa samo delom imena ulice', () => {

        cy.get('#ulicaBroj')
            .clear()
            .type('Bosk')

        cy.get('.row > .btn').click()

        cy.xpath("//a[normalize-space()='Boska Buhe 42, Novi Sad']")
        .should('have.text', 'Boska Buhe 42, Novi Sad')
            
    })

    it('Pretraga grada', () => {

        cy.get('#mesto')
            .clear()
            .type('Novi Sad')

        cy.get('.row > .btn').click()

        cy.get('tbody>tr')
        
        
        cy.xpath("//a[normalize-space()='Boska Buhe 42, Novi Sad']")
        .should('have.text', 'Boska Buhe 42, Novi Sad')
    })

    it('Pretraga ne unoseci nista', () => {

        cy.get('#ulicaBroj')
            .clear()

        cy.get('#mesto')
            .clear()

        cy.get('.row > .btn').click()

        cy.get('tbody>tr')
            .should('have.length', 50)  //pada jer nije prilagodjeno trenutnom stanju, ostalo od vezbanja

    })

    it('Pretraga unoseci nepostojece karaktere', () => {

        cy.get('#ulicaBroj')
            .clear()
            .type('@')

        cy.get('#mesto')
            .clear()
            .type('@')

        cy.get('.row > .btn').click()

        cy.get('h2')
            .should('have.text', 'Nijedna zgrada sa trazenim kriterijumima nije prondajena!') //trebalo bi da pise pronadjena
    })
})

describe('Testiramo padajuci meni', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Zgrade').click()
        cy.contains('Pregled').click()
    })

    it('Selektijemo prikaz od 5 i gledamo da li nam stvarno prikazuje 5 redova', () => {

        cy.get('#prikaz').select('5')

        cy.get('tbody>tr')
            .should('have.length', 5)

        cy.get(':nth-child(4) > .btn').click() //prelazak na drugu stranu

        cy.get('tbody>tr')
            .should('have.length', 5)//pada jer nije prilagodjeno trenutnom stanju, ostalo od vezbanja

        cy.get(':nth-child(5) > .btn').click()      //treca strana

        cy.get('tbody>tr')
            .should('have.length', 5)//pada jer nije prilagodjeno trenutnom stanju, ostalo od vezbanja


        cy.get(':nth-child(6) > .btn').click()  //prelazak na poslednju stranu

        cy.get('tbody>tr')
            .should('have.length.lte', 5)
    })

    it('Selektijemo prikaz od 10 i gledamo da li nam stvarno prikazuje 10 redova', () => {

        cy.get('#prikaz').select('10')

        cy.get('tbody>tr')
            .should('have.length.lte', 10)


        
    })

    it('Seletujemo prikaz od 25 elemenata', () => {

        cy.get('#prikaz').select('25')

        cy.get('tbody>tr')
            .should('have.length.lte', 25)


    })

    it('Selektujemo prikaz od 50 elemenata', () => {

        cy.get('#prikaz').select('50')

        cy.get('tbody>tr')
            .should('have.length.lte', 50)


    })
})

describe('Odlazak na zgradu', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Zgrade').click()
        cy.contains('Pregled').click()
    })

    it('Odlazak na zgradu koja sadrzi zadatu ulicu i broj', () => {


         cy.get('table')
            .find('tbody>tr>td>a').contains('Boska Buhe 42, Novi Sad')
            .click()

    })
})