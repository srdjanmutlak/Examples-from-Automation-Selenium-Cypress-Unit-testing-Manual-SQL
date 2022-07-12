/**
     * For this test to work we need "401 - Unauthorized" gone
     * We need authorization
     */
describe('Testing links', () => {

   it('Tests if links are live and functional', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

       cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/', {failOnStatusCode: false})
   // username and password can be imprinted into a address for quicker access
   

   cy.xpath("//a[@href='javascript:;']")
        .then((links) => {

        cy.request(links.prop('href'))
        .its('status')
        .should('eq', 200)
        //we check if all 9 links are up and running 
       })

       // this test FAILS, links do not work
 })
 
})
