describe('Testiramo polje za pretragu firmi', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Firme').click()
        cy.contains('Pregled').click()
        cy.get('#prikaz').select('50')
    })

    it('Pretraga zgrade koja vec postoji uneli', () => {

        cy.get('#filter')
            .clear()
            .type('firma1@gmail.com')        //pretraga preko emaila

        cy.contains('Pretraga').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'firma1@gmail.com')
            .and('have.length', 1)

    })

    it('pretraga samo sa nazivom firme', () => {

        cy.get('#filter')
            .clear()
            .type('Firma 1')          //pretraga sa samo nazivom

        cy.contains('Pretraga').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'firma1@gmail.com')         //asertujemo tabelu
            .and('have.length', 1)

    })

    it('Pretraga sa samo delom emaila', () => {

        cy.get('#filter')
            .clear()
            .type('ma1@')          //pretraga sa samo delom emaila

        cy.contains('Pretraga').click()

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'firma1@gmail.com')         //asertujemo tabelu
            .and('have.length', 1)
    })

    it('Pretraga ne unoseci nista', () => {

        cy.get('#filter')
            .type('aaa')
            .clear()            //brismeo ono sto smo uneli

        cy.contains('Pretraga').click()

        cy.get('tbody>tr')
            .should('have.length', 3)       //ovo mi je samo dodatna asertacija

    })

    it('Pretraga unoseci nepostojece karaktere', () => {

        cy.get('#filter')
            .clear()
            .type('$$')

        cy.contains('Pretraga').click()

        cy.get('h2')
            .should('contain', 'Nijedna firma sa trazenim kriterijumom nije prondajena!') //trebalo bi da pise pronadjena umesto prondajena
    })
})