describe('Testing saucedemo', () => {
    it('adding the prices together', () => {
		
		cy.signInSauce('standard_user', 'secret_sauce')      //Go to https://www.saucedemo.com/, Log in to the site

        cy.get('#add-to-cart-sauce-labs-backpack').click()             //Add an item from the list to the cart
		
		cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()              //Add an item from the list to the cart

        cy.get('.shopping_cart_badge').should('have.text', '2')    //Verify that the cart badge is updated correctly

        cy.contains('Sauce Labs Bike Light').click()         //Open another item’s details page
        
        cy.get('#add-to-cart-sauce-labs-bike-light').click()             //Add the item to the cart

        cy.get('.shopping_cart_link').click()             //Open the cart

        cy.xpath("//div[@class='cart_item']").should(($lis) => {
        expect($lis).to.have.length(3)
    })

        cy.xpath("//div[@class='inventory_item_name']").should(($lis) => {
        expect($lis).to.have.length(3)
        expect($lis.eq(0)).to.have.text('Sauce Labs Backpack')
        expect($lis.eq(1)).to.have.text('Sauce Labs Bolt T-Shirt')
		expect($lis.eq(2)).to.have.text('Sauce Labs Bike Light')

        }) // Verify that the correct items are present (3 different items)
	    
	cy.get('.title')
            .invoke('css', 'fontSize')
            .then(cy.log)
            .should('match', /^\d+px$/)
            .invoke('replace', 'px', '')
            .then(cy.log)
            .then(Number)
            .should('closeTo', 24, 1)

        // Checking the pixels on the TITLE

        cy.get('.title')
            .invoke('height')
            .should('be.greaterThan', 27.9999999999999).and('be.lessThan',28.0000000000001)
        cy.get('.title')
            .invoke('width')
            .should('be.greaterThan', 140.90624).and('be.lessThan',140.90626)

        // Checking the height and width of the title
    
        
        cy.get('#checkout').click()             //Continue to the Checkout page

        cy.checkoutForm('Babyface', 'BigGeorge','24430') //Complete the checkout form
		
		cy.get('.inventory_item_price').then(($cells) => {
			const totals = $cells
				.toArray()
				.map((el) => el.innerText)
				.map((s) => s.replace('$', ''))
				.map(parseFloat)
			const sum = Cypress._.sum(totals)
			cy.log(`Total should be ${sum}`)
			
			cy.contains('.summary_subtotal_label', '$' + sum)
		// Confirm that the total sum in app is correct and it sums up prices correctly		
			
		
        cy.get('#finish').click()                     //Complete the order

        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')

    })  //Verify that the order is completed successfully with the displayed message

})
})
