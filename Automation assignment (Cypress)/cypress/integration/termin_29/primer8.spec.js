describe('Admin Demo Testing With Custom Commands', () => {
    it('Login Test', () => {
        // valid login
        cy.signIn('admin@yourstore.com', 'admin')
        cy.title().should('be.equal', 'Dashboard / nopCommerce administration')

        // invalid login
        // cy.signIn('admin@yourstore.com', 'adminko')
        // cy.title().should('be.equal', 'Your store. Login')
    })

    it('Uspesno dodat kupac', () => {
        cy.log('add customer...')

        cy.signIn('admin@yourstore.com', 'admin')
    })

    it('Edit Customer Test', () => {
        cy.log('edit customer...')

        cy.signIn('admin@yourstore.com', 'admin')
    })

    it('Delete Customer Test', () => {
        cy.log('delete customer...')

        cy.signIn('admin@yourstore.com', 'admin')
    })
})
