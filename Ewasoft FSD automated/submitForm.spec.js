/**
     * For this test to work we need alert pop ups enabled
     *
     */

describe('Testing submit form', () => {
	
  before(() => {

       cy.intercept("POST").as("submitFormActuallyHappened")
     //we need this here to verify later on that API for for submit form went through and submit form section is actually working
     })

   it('Tests if we get the proper msg after leaving all input fields empty', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit leaving all three input fields empty 

   cy.on('window:alert', (text) => {
   expect(text).to.contains('Please fill out this field.');
   })
   //we check if alert pops up for the first field 
 })
 
 it('Tests if we get the proper msg after leaving second input field empty and if letters are properly typed', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("input[placeholder='Enter your name ']")
   .type('srdjan')	
   
   cy.get("textarea[placeholder='Your message']")
   .type('Does this work anyway?')
   //we fill out name and message input fields 
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit 

   cy.on('window:alert', (text) => {
   expect(text).to.contains('Please fill out this field.');
   })
   //we check if alert pops up
   
   cy.get("textarea[placeholder='Your message']").should('have.value', 'Does this work anyway?')
   //we check if app reads letters properly 
   //this one does not FAILS, value is not DOES THIS WORK ANYWAY? - but visually app transfers capital letters constatly
   

})
 
 it('Tests if we get the proper msg after leaving third input field empty', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("input[placeholder='Enter your name ']")
   .type('srdjan')
   //(app also transfers only capital letters here)
   
   cy.get("input[placeholder='Enter your email']")
   .type('srdjanmutlak123@gmail.com')	
   //we fill out name and email input fields 
   //(app also transfers only capital letters here, but email addresses are not case sensitive by default so this isn't a priority)
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit  

   cy.on('window:alert', (text) => {
   expect(text).to.contains('Please fill out this field.');
   })
   //we check if alert pops up
 })
 
 it('Tests if submit form will went through after all three input fields are filled', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("input[placeholder='Enter your name ']")
   .type('srdjan')
   //(app also transfers only capital letters here)
   
   cy.get("input[placeholder='Enter your email']")
   .type('srdjanmutlak123@gmail.com')	
   //we fill name and email input fields 
   //(app also transfers only capital letters here, but email addresses are not case sensitive by default so this isn't a priority)
   
   cy.get("textarea[placeholder='Your message']")
   .type('Does this work anyway?')
   //we fill name and message input fields 
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit  

   cy.wait("@submitFormActuallyHappened") 
   // this will FAIL because there is no trace of POST API call after clicking Submit anywhere, app just reloads itself
 })
 
 it('Tests if submit form will went through after all three input fields are filled with non textual values', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("input[placeholder='Enter your name ']")
   .type('   ')
   
   cy.get("input[placeholder='Enter your email']")
   .type('   ')	
   
   cy.get("textarea[placeholder='Your message']")
   .type('     ')
   .type('{enter}')
       .type('{enter}') 
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit  
   
   cy.on('window:alert', (text) => {
   expect(text).to.contains('Please fill out this field.');
   })
   //we check if alert pops up informing us that fields are not properly filled
   // this one FAILS, app reloads itself, there is no pop out message
   
 })
 
 it('Tests if submit form will went through after all three input fields are filled with sings that are not used for proper name and email validation form', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("input[placeholder='Enter your name ']")
   .type('!#!"$%$#&/((?*@{}[]|\ß¤×÷')
   
   cy.get("input[placeholder='Enter your email']")
   .type('!#!"$%$#&/((?*@{}[]|\ß¤×÷')	
   
   cy.get("textarea[placeholder='Your message']")
   .type('!#!"$%$#&/((?*@{}[]|\ß¤×÷')
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit  
   
   cy.on('window:alert', (text) => {
   expect(text).to.contains('Please fill out name and email inputs with proper name and email.');
   })
   //we check if alert pops up informing us that fields are not properly filled
   // this one FAILS, app reloads itself, there is no pop out message
   
 })
 
 it('Tests if submit form will went through after all three input fields are filled with unusually long strings of characters', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
       cy.get('.contact-section__content').scrollIntoView() 
   // we scroll down to Submit form
   
   cy.get("input[placeholder='Enter your name ']")
   .type('adadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrh', { delay: 0 })
   
   cy.get("input[placeholder='Enter your email']")
   .type('adadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrh', { delay: 0 })	
   
   cy.get("textarea[placeholder='Your message']")
   .type('adadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrhadadhiuhifuhefh9eh9w3h9wh9fwhf9ahef9ahfhahf890hjfa098fe8jhf098hfrh', { delay: 0 })
   
   cy.get("button[type='submit']")
       .click()
   // we click Submit  
   
   cy.on('window:alert', (text) => {
   expect(text).to.contains('Input must be under 25 characters.');
   })
   //we check if alert pops up informing us that fields are not properly filled
   // this one FAILS, app reloads itself, there is no pop out message
   
 })
 
})
