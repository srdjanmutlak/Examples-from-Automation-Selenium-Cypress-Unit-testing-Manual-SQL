describe('Page load event', () => {
    it('timeout specified', () => {
        cy.visit('https://admin-demo.nopcommerce.com/login', {
            // wait 30 sec for page 'load' event
            timeout: 30000, 
        })
    })
})