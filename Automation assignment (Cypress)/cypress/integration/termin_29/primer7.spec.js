describe('Admin Demo Testing Without Custom Commands', () => {
    it('Login Test', () => {
        cy.visit('https://admin-demo.nopcommerce.com/login')

        cy.get('input[name=Email]')
            .clear()
            .type('admin@yourstore.com')

        cy.get('input[name=Password]')
            .clear()
            .type('admin')

        cy.get('.button-1')
            .click()
    })

    it('Add Customer Test', () => {
        cy.log('add customer...')

        cy.visit('https://admin-demo.nopcommerce.com/login')

        cy.get('input[name=Email]')
            .clear()
            .type('admin@yourstore.com')

        cy.get('input[name=Password]')
            .clear()
            .type('admin')

        cy.get('.button-1')
            .click()

            // test za dodavanje
    })

    it('Edit Customer Test', () => {
        cy.log('edit customer...')

        cy.visit('https://admin-demo.nopcommerce.com/login')

        cy.get('input[name=Email]')
            .clear()
            .type('admin@yourstore.com')

        cy.get('input[name=Password]')
            .clear()
            .type('admin')

        cy.get('.button-1')
            .click()

            // izmena kupca
    })

    it('Delete Customer Test', () => {
        cy.log('delete customer...')

        cy.visit('https://admin-demo.nopcommerce.com/login')

        cy.get('input[name=Email]')
            .clear()
            .type('admin@yourstore.com')

        cy.get('input[name=Password]')
            .clear()
            .type('admin')

        cy.get('.button-1')
            .click()

            // brisanje
    })
})
