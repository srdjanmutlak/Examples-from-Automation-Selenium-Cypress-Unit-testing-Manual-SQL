describe('Test Example for Viewports', () => {
    it('show different screen sizes', () => {
        cy.visit('https://admin-demo.nopcommerce.com/login')

        /* U beforeEach postavimo rezoluciju i onda pišemo testove.
           test može npr. da proveri da li je neki element vidljiv:
               cy.get('someElement').should('be.visible')
        */

        cy.viewport(320, 480)

        cy.viewport(2999, 2999)

        // create screenshot
        cy.screenshot('my-image2')

        cy.viewport('samsung-note9')
        cy.wait(2000)

        cy.viewport('samsung-s10')
        cy.wait(2000)

        cy.viewport('macbook-16')
        cy.wait(2000)

        cy.viewport('macbook-15')
        cy.wait(2000)

        cy.viewport('macbook-13')
        cy.wait(2000)

        cy.viewport('macbook-11')
        cy.wait(2000)

        cy.viewport('ipad-2')
        cy.wait(2000)

        cy.viewport('ipad-mini')
        cy.wait(2000)

        cy.viewport('iphone-se2')
        cy.wait(2000)

        cy.viewport('iphone-xr')
        cy.wait(2000)

        cy.viewport('iphone-x')
        cy.wait(2000)

        cy.viewport('iphone-8')
        cy.wait(2000)

        cy.viewport('iphone-7')
        cy.wait(2000)

        cy.viewport('iphone-6+')
        cy.wait(2000)

        cy.viewport('iphone-6')
        cy.wait(2000)

        cy.viewport('iphone-5')
        cy.wait(2000)

        cy.viewport('iphone-4')
        cy.wait(2000)

        cy.viewport('iphone-3')
        cy.wait(2000)

        cy.viewport('ipad-2', 'portrait')
        cy.wait(2000)

        cy.viewport('iphone-4', 'landscape')
        cy.wait(2000)
    })
})