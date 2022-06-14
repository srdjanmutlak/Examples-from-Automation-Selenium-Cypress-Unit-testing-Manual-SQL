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
	    
	 cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div", { timeout: 100000 })
  	    .first()
 	    .invoke('text')
         .then((s) => {
            const start = s.indexOf('')
            const end = s.indexOf(' km', start)
            return s.slice(start + 0, end)
             })
            .then(cy.log)
            .then(parseInt)
  	    // anything we extract from the page
  	    // should be used in cy.then(callback)
  	    .then((longestRoute) => {
    	    cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div")
      	    .eq(1)
      	    .invoke('text')
      	    .then(parseInt)
      	    // the second score from the page
      	    // is passed to cy.then(callback)
      	    .then((shortRoute1) => {
            // now both scoreA and scoreB are in scope
            // and can be compared using an assertion
            expect(shortRoute1, 'Second route is shorter than the longest one').to.be.lessThan(longestRoute)
      		    })
          })

          cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div")
  	    .first()
 	    .invoke('text')
         .then((s) => {
            const start = s.indexOf('')
            const end = s.indexOf(' km', start)
            return s.slice(start + 0, end)
             })
            .then(cy.log)
            .then(parseInt)
  	    // anything we extract from the page
  	    // should be used in cy.then(callback)
  	    .then((longestRoute) => {
    	    cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div")
      	    .eq(2)
      	    .invoke('text')
      	    .then(parseInt)
      	    // the third score from the page
      	    // is passed to cy.then(callback)
      	    .then((shortRoute2) => {
            // now both scoreA and scoreC are in scope
            // and can be compared using an assertion
            expect(shortRoute2, 'Third route is shorter than the longest one').to.be.lessThan(longestRoute)
                  })
                  
            
          })
          
        cy.get(".TIQqpf.fontTitleSmall.XbJon.Hk4XGb")
        .click({ force: true })
    
    
       cy.get(".PNEhTd.Hk4XGb")
       .should('contain', 'km')
       .should('be.visible')

       cy.contains('сати').should('be.visible')
       cy.contains('мин').should('be.visible')

})
})

