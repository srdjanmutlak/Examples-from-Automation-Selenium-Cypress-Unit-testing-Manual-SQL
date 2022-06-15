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
		
	    cy.get("a[href='https://maps.google.com/']")
        .then((link) => {

        cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200)
        //googlemaps are up and running 
       })

       cy.get("a[href='https://maps.google.com/']").click()
       //we choose googlemaps

       cy.get('#searchboxinput')
       .should('be.visible')
       .click()
       .type('budapest')
       .type('{enter}')
       //we type budapest in search field

       cy.get("button[aria-label='Путања до Будимпешта']", { timeout: 100000 })
       .should('be.visible')
       .click({ force: true })
       //we click on directions button

       cy.xpath("//input[@aria-controls='sbsg51']")
       .should('be.visible')
       .click()
       .type('belgrade')
       .type('{enter}')
       //we we type belgrade as the other chosen destination

       cy.xpath("(//button[@role='radio'])[2]")
       .should('be.visible')
       .click()

       cy.get("button[role='radio'][aria-checked='true']", { timeout: 100000 })
       .should('have.attr', 'aria-checked', 'true')
       //driving by car should be already selected

       cy.get('.OcYctc.fontTitleSmall.XbJon')
       .should('be.visible')
       .click()

       cy.get("label[for='pane.directions-options-avoid-highways']")
       .should('be.visible')
       .click()
       
       cy.xpath("//input[@id='pane.directions-options-avoid-highways']")
       .should('have.attr', 'checked')
       //we choose option to avoid highways and we check if the box is checked afterwards

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
          // we prove that we found the longest route
          
        cy.get(".TIQqpf.fontTitleSmall.XbJon.Hk4XGb", { timeout: 100000 })
        .should('be.visible')
        .click({ force: true })
        // we click details button for the longest route
    
    
       cy.get(".PNEhTd.Hk4XGb")
       .should('contain', 'km')
       .should('be.visible')

       cy.contains('сати').should('be.visible')
       cy.contains('мин').should('be.visible')
       // distance and time are visible in details

})
})