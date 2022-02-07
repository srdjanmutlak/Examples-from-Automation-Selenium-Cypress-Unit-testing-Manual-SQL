describe('Testing orangehrm', () => {
    it('search form', () => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false                                      // removing unnecessary data and making automation more functional
        })
        
        cy.visit('/', {failOnStatusCode: false});          //overriding unauthorized 401

        cy.get("#btnLogin")
            .click()                                 //Login

        cy.xpath("//span[normalize-space()='Recruitment']", { timeout: 10000 }).click()

        cy.get("#menu_recruitment_viewCandidates").click()        //Wait for the dashboard page to load; Go to Recruitment; Click on Candidates on the left side panel

       cy.frameLoaded('#noncoreIframe')                       //Entering Iframe

       cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']").should(($lis) => {
        
       expect($lis).to.have.length(44)
                  
        })
        
        cy.iframe().xpath("(//tbody)[4]")
         .find("tr")
        .then((row) => {
                      //row.length will give you the row count
         cy.log(row.length)
            
        })

       cy.iframe().find('#addItemBtn').should('be.visible').click()               //Print out the number of candidates; Click on the green Add button

       cy.addNewCandidate('QA Automation', 'I got strange last name', 'QAauto@gmail.com')  //Fill the mandatory fields and vacancy (attach file must be in fixtures folder)
        //Also check commands.js for attach file command solution

       cy.reload()              //reload so that Cypress would catch the next action

       cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']", { timeout: 10000 }).should(($lis) => {
        
        expect($lis).to.have.length(45)
                   
         })                       // number of candidates is increased by 1.

        cy.iframe().xpath("(//label[@style='margin-bottom:-11px;'])[1]").click({ force: true })   //Select the freshly created candidate (always on top)

        cy.iframe().xpath("//i[@class='material-icons icons-color handCurser']").click({ force: true })

        cy.iframe().xpath("//a[@id='deleteItemBtn']").click({ force: true })          //Click on the three dots in the left upper side of the table and delete the candidate

        cy.iframe().find('#modal-delete-candidate').should('be.visible').then(($dialog)=>{
            cy.iframe().wrap($dialog).find('#candidate-delete-button').click({ force: true })
            });          //We find the modal and we delete the candidate
        

        cy.iframe().xpath("//tr[@class='dataDefaultRaw dataRaw handCuser']", { timeout: 10000 }).should(($lis) => {
         
         expect($lis).to.have.length(44)
                    
          })               // number of candidates is decreased by 1.
        
        cy.iframe().xpath("//a[@id='user-dropdown']").click({ force: true })
        
        cy.iframe().xpath("//a[@id='logoutLink']").click({ force: true })        // Open the side menu(already open); Click on the User icon and Logout
    })

})
