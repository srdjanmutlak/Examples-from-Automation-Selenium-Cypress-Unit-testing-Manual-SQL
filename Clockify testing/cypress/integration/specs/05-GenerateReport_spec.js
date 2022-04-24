import { HomePage } from "../../fixtures/homePage"
let homePage = new HomePage();

describe('Report suite', () => {
    it('Generate report scenario', () => {
        
        homePage.navigateToHomePage();
        homePage.navigateToLogin();
        homePage.login();
        homePage.closeNotificationPopup();

        cy.get('.cl-align-items-end > .cl-h2').then(($el) => {
            var LogTimeForWeek = $el.text().trim(); 
            cy.get(':nth-child(6) > .cl-d-none').click(); // click report tab
            cy.get(':nth-child(1) > .cl-h2').should('have.text', LogTimeForWeek);
        });
    })
})
