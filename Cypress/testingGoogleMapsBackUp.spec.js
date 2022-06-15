describe('Testing google maps: Since google maps are constantly updating there coud be a case of changing the position of the longest path. Therefore two of these tests will almost always fail, but one will pass. If one or more tests are passable whole test passes' , () => {

    it('Testing if longest route is in the first place', () => {

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
           
       })

       cy.get("a[href='https://maps.google.com/']").click()

       cy.get('#searchboxinput')
       .click()
       .type('budapest')
       .type('{enter}')

       cy.get("button[aria-label='Путања до Будимпешта']", { timeout: 100000 }).click({ force: true })

       cy.xpath("//input[@aria-controls='sbsg51']")
       .click()
       .type('belgrade')
       .type('{enter}')

       cy.xpath("(//button[@role='radio'])[2]").click()

       cy.get('.OcYctc.fontTitleSmall.XbJon').click()

       cy.get("label[for='pane.directions-options-avoid-highways']").click()

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
          
        cy.get(".TIQqpf.fontTitleSmall.XbJon.Hk4XGb", { timeout: 100001 })
        .click({ force: true })
    
    
       cy.get(".PNEhTd.Hk4XGb")
       .should('contain', 'km')
       .should('be.visible')

       cy.contains('сати').should('be.visible')
       cy.contains('мин').should('be.visible')

})

it('Testing if longest route is in the second place', () => {

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
       
   })

   cy.get("a[href='https://maps.google.com/']").click()

   cy.get('#searchboxinput')
   .click()
   .type('budapest')
   .type('{enter}')

   cy.get("button[aria-label='Путања до Будимпешта']", { timeout: 100000 }).click({ force: true })

   cy.xpath("//input[@aria-controls='sbsg51']")
   .click()
   .type('belgrade')
   .type('{enter}')

   cy.xpath("(//button[@role='radio'])[2]").click()

   cy.get('.OcYctc.fontTitleSmall.XbJon').click()

   cy.get("label[for='pane.directions-options-avoid-highways']").click()

   cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div", { timeout: 100000 })
      .eq(1)             //if the longest route is not in the second place this test will fail
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
          .eq(0)
          .invoke('text')
          .then(parseInt)
          // the first score from the page
          // is passed to cy.then(callback)
          .then((shortRoute1) => {
        // now both scoreA and scoreB are in scope
        // and can be compared using an assertion
        expect(shortRoute1, 'First route is shorter than the longest one').to.be.lessThan(longestRoute)
              })
      })

      cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div")
      .eq(1)
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

    cy.get("#section-directions-trip-1", { timeout: 100001 })
      .click({ force: true })
      
    cy.get(".TIQqpf.fontTitleSmall.XbJon.Hk4XGb[aria-labelledby='section-directions-trip-details-msg-1']")
    .click({ force: true })


   cy.get(".PNEhTd.Hk4XGb")
   .should('contain', 'km')
   .should('be.visible')

   cy.contains('сати').should('be.visible')
   cy.contains('мин').should('be.visible')

})

it('Testing if longest route is in the third place', () => {

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
       
   })

   cy.get("a[href='https://maps.google.com/']").click()

   cy.get('#searchboxinput')
   .click()
   .type('budapest')
   .type('{enter}')

   cy.get("button[aria-label='Путања до Будимпешта']", { timeout: 100000 }).click({ force: true })

   cy.xpath("//input[@aria-controls='sbsg51']")
   .click()
   .type('belgrade')
   .type('{enter}')

   cy.xpath("(//button[@role='radio'])[2]").click()

   cy.get('.OcYctc.fontTitleSmall.XbJon').click()

   cy.get("label[for='pane.directions-options-avoid-highways']").click()

   cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div", { timeout: 100000 })
      .last()              // if the longest route isn't in the third place this test will fail
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
          .eq(0)
          .invoke('text')
          .then(parseInt)
          // the first score from the page
          // is passed to cy.then(callback)
          .then((shortRoute1) => {
        // now both scoreA and scoreB are in scope
        // and can be compared using an assertion
        expect(shortRoute1, 'First route is shorter than the longest one').to.be.lessThan(longestRoute)
              })
      })

      cy.get("div div[class='ivN21e tUEI8e fontBodyMedium'] div")
      .last()
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
          .then((shortRoute2) => {
        // now both scoreA and scoreC are in scope
        // and can be compared using an assertion
        expect(shortRoute2, 'Second route is shorter than the longest one').to.be.lessThan(longestRoute)
              })
              
        
      })

    cy.get("#section-directions-trip-2", { timeout: 100001 })
      .click({ force: true })
      
    cy.get(".TIQqpf.fontTitleSmall.XbJon.Hk4XGb[aria-labelledby='section-directions-trip-details-msg-2']")
    .click({ force: true })


   cy.get(".PNEhTd.Hk4XGb")
   .should('contain', 'km')
   .should('be.visible')

   cy.contains('сати').should('be.visible')
   cy.contains('мин').should('be.visible')

})
})