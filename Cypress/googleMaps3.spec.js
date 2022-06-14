describe('Testing google maps', () => {

    it('Testing', () => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false                                      // removing unnecessary data and making automation more functional
        })

        cy.visit('https://www.google.com')
    
        cy.get("input[title='Претражи']")
        .type("google maps")
        .type('{enter}')
    //We search for google maps on Google.com    
	
	    cy.get("a[href='https://maps.google.com/']")
        .then((link) => {

        cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200)
           
       })
	//We check if the app is up and running by API request

       cy.get("a[href='https://maps.google.com/']").click()
    //We click on it

       cy.get('#searchboxinput')
       .click()
       .type('budapest')
       .type('{enter}')
    //We search for Budapest and we press enter

       cy.get("button[aria-label='Путања до Будимпешта']", { timeout: 100000 }).click({ force: true })
    //We choose directions button

       cy.xpath("//input[@aria-controls='sbsg51']")
       .click()
       .type('belgrade')
       .type('{enter}')
    //We enter second location Belgrade

       cy.xpath("(//button[@role='radio'])[2]").click()

       cy.get('.OcYctc.fontTitleSmall.XbJon').click()
     //We chose options

       cy.get("label[for='pane.directions-options-avoid-highways']").click()
     //We chose to avoid highways
	 
		cy.xpath("//div[@id='section-directions-trip-0']//div[@jstcache = '200']").invoke('text').replace(' km', '').then(parseInt).as('longestRoute')
		
		cy.xpath("//div[@id='section-directions-trip-1']//div[@jstcache = '200']").invoke('text').replace(' km', '').then(parseInt).as('shortRoute1')
		
		cy.xpath("//div[@id='section-directions-trip-2']//div[@jstcache = '200']").invoke('text').replace(' km', '').then(parseInt).as('shortRoute2')
		
		cy.get('@longestRoute').should('be.gt', @shortRoute1)
		cy.get('@longestRoute').should('be.gt', @shortRoute2)
		
		//
		
		cy.xpath("//div[@id='section-directions-trip-0']//div[@jstcache = '200']")
		.invoke('text')
		.then((s) => s.split(' '))
		.invoke('find', (s) => s.startsWith(' km'))
		.then((s) => s.replace(' km', ''))
		.then(parseFloat)
		.as('longestRoute')
		
		cy.xpath("//div[@id='section-directions-trip-1']//div[@jstcache = '200']")
		.invoke('text')
		.then((s) => s.split(' '))
		.invoke('find', (s) => s.startsWith(' km'))
		.then((s) => s.replace(' km', ''))
		.then(parseFloat)
		.as('shortRoute1')
		
		cy.xpath("//div[@id='section-directions-trip-2']//div[@jstcache = '200']")
		.invoke('text')
		.then((s) => s.split(' '))
		.invoke('find', (s) => s.startsWith(' km'))
		.then((s) => s.replace(' km', ''))
		.then(parseFloat)
		.as('shortRoute2')
		
		cy.get('@longestRoute').should('be.gt', @shortRoute1)
		cy.get('@longestRoute').should('be.gt', @shortRoute2)
		

    //   cy.xpath("//div[@class='ivN21e tUEI8e fontBodyMedium']").should(($lis) => {
     //   expect($lis).to.have.length(3)
    //    expect($lis.eq(0)).to.contain('391 km')
     //   expect($lis.eq(1)).to.contain('364 km')
    //    expect($lis.eq(2)).to.contain('371 km')
        
     //   })

	//We check which path is the longest one. These numbers didn't change in course of one hour.

       // cy.xpath("(//div[@class='ivN21e tUEI8e fontBodyMedium'])[1]").click({ force: true })
	//We choose the first and the longest one by index number 

    
       cy.xpath("//span[contains(text(),'391 km')]")
       .should('have.text', '391 km')
       .should('be.visible')
	//km is visible in details

       cy.contains('сати').should('be.visible')
       cy.contains('мин').should('be.visible')
	//hours and minutes are visible in details

})
})

