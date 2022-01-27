// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })



Cypress.Commands.add('postTweet', (id1, content1, bw_timestamp1) => {                         

    cy.request({                                                                
            method: 'POST',                                                      
            url:  'http://localhost:8080/tweets',      
            body: {
                id: id1,
                content: content1,
                bw_timestamp: bw_timestamp1,
              }
        }).then((response) => {     
            expect(response.status).to.eq(200) 
       //     expect(response.body).to.have.property('id', id1) 
         //   expect(response.body).to.have.property('content', content1) 
         //   expect(response.body).to.have.property('bw_timestamp', bw_timestamp1)
                                       
        })                                                                      
});
