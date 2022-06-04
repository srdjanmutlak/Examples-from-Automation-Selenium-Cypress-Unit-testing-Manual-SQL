describe('Testing unique and duplicate items', () => {
    it('Find Duplicate Text Lightweight And Confirm The Rest Of Elements Are Unique', () => {
		
	cy.visit('https://cdpn.io/pen/debug/wvyXVRa?authentication_hash=bYMdyOpxVVQr')      

        cy.get('li:contains(Lightweight)').should('have.length', 2)     

		cy.get('li:not(:contains(Lightweight))')
		.should('have.length', 3) 	
		.then($el) => Cypress._.map($el, 'innerText'))
		.then((values) => {
			const distinct = Cypress._.uniq(values)
			expect(distinct).to.have.length(values.length)
		})

    })  

})
