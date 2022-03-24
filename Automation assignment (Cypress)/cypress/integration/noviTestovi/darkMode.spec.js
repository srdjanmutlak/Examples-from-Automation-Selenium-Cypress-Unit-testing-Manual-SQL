describe('Testing Reddit dark mode', () => {
    
    before(() => {

        cy.intercept("POST", " https://gql.reddit.com/").as("wholePageHasLoaded")
      
      })
    
    it('checks if dark mode works', () => {
    
    Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false                                      // removing unnecessary data and making automation more functional
        })

    cy.visit('https://www.reddit.com/', {failOnStatusCode: false}) 
    //Go to reddit.com
    
    cy.wait("@wholePageHasLoaded")

    cy.get('._1VP69d9lk-Wk9zokOaylL').should('have.attr', 'style', '--background:#FFFFFF; --canvas:#DAE0E6;') 
    
    cy.get('._1VP69d9lk-Wk9zokOaylL').should('have.css', 'background-color').and('eq', 'rgb(255, 255, 255)') 
    //Verify that the mode is light
    
    cy.get("i[class='icon icon-caret_down']").click() 
    //Click on user dropdown
    
    cy.get("button[role='switch']").click() 
    //Click on dark mode button
    
    cy.get('._1VP69d9lk-Wk9zokOaylL').should('have.attr', 'style', '--background:#1A1A1B; --canvas:#030303;') 
    
    cy.get('._1VP69d9lk-Wk9zokOaylL').should('have.css', 'background-color').and('eq', 'rgb(26, 26, 27)') 
    //Verify that the color changed
    
    cy.get('#USER_DROPDOWN_ID').click() 
    //Click on user dropdown
    
    cy.get("button[role='switch']").click() 
    //Click on dark mode button
    
    cy.get('._1VP69d9lk-Wk9zokOaylL').should('have.attr', 'style', '--background:#FFFFFF; --canvas:#DAE0E6;') 
    
    cy.get('._1VP69d9lk-Wk9zokOaylL').should('have.css', 'background-color').and('eq', 'rgb(255, 255, 255)') 
    //Verify that the color changed again
    
        }) 
    
    })