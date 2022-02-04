
describe('Testing orangehrm', () => {
    it('search form', () => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        
        cy.visit('/', {failOnStatusCode: false});

        // Enter value Cypress into input field
        cy.get("#btnLogin")
            .click()

        cy.xpath("//span[normalize-space()='Recruitment']").click()

        cy.get("#menu_recruitment_viewCandidates").click()

       // cy.getIframe('#noncoreIframe').find("#addItemBtn", { timeout: 10000 }).click()

       cy.frameLoaded('#noncoreIframe')

       cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']").should(($lis) => {
        
       expect($lis).to.have.length(44)
                  
        })

       cy.iframe().find('#addItemBtn').should('be.visible').click()

       cy.addNewCandidate('QA Automation', 'I got strange last name', 'QAauto@gmail.com')

       cy.frameLoaded('#noncoreIframe')

       cy.iframe().find("th[sortvalue='candidate']").click()

       cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']", { timeout: 10000 }).should(($lis) => {
        
        expect($lis).to.have.length(45)
                   
         })
    })
})