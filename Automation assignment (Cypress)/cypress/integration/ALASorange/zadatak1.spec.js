/**
     *Go to https://orangehrm-demo-7x.orangehrmlive.com/
     * Login with admin credentials (form is prefilled with the login data)
     * Wait for the dashboard page to load
     * Go to Recruitment page
     * Click on Candidates on the left side panel
     * Print out the number of candidates
     * Click on the green Add button
     * Fill the mandatory fields and vacancy.
     * The candidate name should be QA Automation - <CurrentDate> (Please substitute the current
     * date with the current date) Click Save
     * Use Junit Assert to check if the number of candidates is increased by 1.
     * Select the freshly created candidate
     * Click on the three dots in the left upper side of the table and delete the candidate
     * Use Junit assert to check if the number of candidates decreased by 1
     * Open the side menu
     * Click on the User icon and Logout
     *
     */

describe('Testing orangehrm', () => {

    before(() => {

        cy.intercept("GET", " https://orangehrm-demo-7x.orangehrmlive.com/recruitment/viewCandidates").as("getViewCandidates")

        cy.intercept("GET", " https://orangehrm-demo-7x.orangehrmlive.com/api/permissions").as("getPermissioins")
      
      })

    it('search form', () => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false                                      // removing unnecessary data and making automation more functional
        })
        
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/', {failOnStatusCode: false});          //overriding unauthorized 401

        cy.get("#btnLogin")
            .click()                                 //Login

        cy.wait("@getPermissioins")           //Wait for the dashboard page to load

        cy.get(".main-menu-item-1[data-automation-id='menu_recruitment_Recruitment(ATS)']").click()        //Go to Recruitment

       cy.frameLoaded('#noncoreIframe')                       //Entering Iframe

       cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']").should(($lis) => {
        
       expect($lis).to.have.length(49)
                  
        })
        
        cy.iframe().xpath("(//tbody)[4]")
         .find("tr")
        .then((row) => {
                      //row.length will give you the row count
         cy.log(row.length)
            
        })

       cy.iframe().find('#addItemBtn').should('be.visible').click()               //Print out the number of candidates; Click on the green Add button

       cy.addNewCandidate('QA Automation', 'I got strange last name', 'QAauto@gmail.com')  //Fill the mandatory fields and vacancy (attach file must be in fixtures folder)

       cy.reload()              //reload so that Cypress would catch the next action

       cy.wait("@getViewCandidates")

       cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']").should(($lis) => {
        
        expect($lis).to.have.length(50)
                   
         })                       // number of candidates is increased by 1.

        cy.iframe().xpath("(//label[@style='margin-bottom:-11px;'])[1]").click({ force: true })   //Select the freshly created candidate (always on top)

        cy.iframe().xpath("//i[@class='material-icons icons-color handCurser']").click({ force: true })

        cy.iframe().xpath("//a[@id='deleteItemBtn']").click({ force: true })          //Click on the three dots in the left upper side of the table and delete the candidate

        cy.iframe().find('#modal-delete-candidate').should('be.visible').then(($dialog)=>{
            cy.iframe().wrap($dialog).find('#candidate-delete-button').click({ force: true })
            });          //We find the modal and we delete the candidate
        
        cy.wait("@getViewCandidates")

        cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']").should(($lis) => {
         
         expect($lis).to.have.length(49)
                    
          })               // number of candidates is decreased by 1.
        
        cy.iframe().xpath("//a[@href='/auth/logout/seamless']").click({ force: true })        // Logout
    })

})
