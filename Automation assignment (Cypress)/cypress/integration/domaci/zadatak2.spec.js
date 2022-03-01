// describe('Zadatak 2', () => {
//     it('Testing Wikivoyage link', () => {
//         // Visit the Wikipedia website
//         cy.visit('https://www.wikipedia.org')

//         // Test Wikivoyage link
//         cy.contains('Wikivoyage')
//             .should('have.attr', 'href')
//             .and('include', 'wikivoyage.org/')

//         // This will result with cross origin error
//         // cy.contains('Wikivoyage').click()
//     })

//     it('Testing Wikivoyage search form', () => {
//         // Visit the Wikivoyage website
//         cy.visit('https://www.wikivoyage.org')

//         // Enter value Cypress into input field

//         cy.get('#searchInput')
//             .type('Cypress{enter}')             // Option 1 - Press enter

//         // Click search button                  // Option 2 - click search button
//         // cy.get('button[type="submit"]')
//         //    .click()

//         // Verify URL
//         cy.url().should('include', 'wikivoyage.org/wiki/Cypress')
//     })
// })