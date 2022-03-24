describe('Checking if we can find a spsecific slide', () => {


    it('Checking if image has loaded', () => {
		
		Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false                                      // removing unnecessary data and making automation more functional
        })
		
		cy.visit('https://www.rottentomatoes.com/')

        cy.get('#masthead-logo')
		.should('be.visible')
		.and('have.prop', 'naturalWidth')
		.then(cy.log)
		.should('be.greaterThan', 0)
		
    })
	
	it('finds the right slide', () => {

        cy.contains('Best Superhero Movies')
		.should('be.visible')
		.scrollIntoView()
		.next()
		
		function getNextSlide(){
			cy.xpath("(//button[@slot='scroll-right'])[3]").then((el) => {
				if(Cypress.dom.isVisible(el)) {
					cy.log('Found it!')
					cy.wrap(el).xpath("//button[@data-media-url='/m/rocketeer']").click()
				} else {
					cy.wait(1000)
					cy.xpath("(//button[@slot='scroll-right'])[3]").click().then(getNextSlide)
					
				}
			})
		}
		getNextSlide()
		cy.url().should('equal', 'https://www.rottentomatoes.com/m/rocketeer')

})
})