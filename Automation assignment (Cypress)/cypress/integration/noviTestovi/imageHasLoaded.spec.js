describe('Checking if image has loaded', () => {


    it('Image has loaded', () => {
		
		cy.visit('https://www.rottentomatoes.com/')

        cy.get('#masthead-logo')
		.should('be.visible')
		.and('have.prop', 'naturalWidth')
		.then(cy.log)
		.should('be.greaterThan', 0)
		
	})
	

})