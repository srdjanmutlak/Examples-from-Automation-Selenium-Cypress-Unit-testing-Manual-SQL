import { HomePage } from "../../fixtures/homePage"
let homePage = new HomePage();
let faker = require('faker')

describe('Project suite', () => {

    it('Create project scenario', () => {

        // first navigate to home page and login
        homePage.navigateToHomePage();
        homePage.navigateToLogin();
        homePage.login();
        homePage.closeNotificationPopup();

        cy.get(':nth-child(9) > .cl-nav-link').click();
        cy.get('.cl-d-flex > .cl-btn').click({ force: true });
        cy.get('.cl-form-group > .cl-form-control').type(faker.commerce.productName());
        cy.get('.cl-modal-footer > .cl-btn').click();

    })
})



