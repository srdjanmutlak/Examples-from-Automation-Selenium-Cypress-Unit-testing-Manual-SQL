import { HomePage } from "../../fixtures/homePage"
let homePage = new HomePage();
let faker = require('faker')

describe('Group suite', () => {

    it('Create group scenario', () => {

        // first navigate to home page and login
        homePage.navigateToHomePage();
        homePage.navigateToLogin();
        homePage.login();
        homePage.closeNotificationPopup();

        cy.get(':nth-child(10) > .cl-nav-link').click();
        cy.get('.cl-nav > :nth-child(2) > .cl-nav-link').click();
        cy.get('.cl-form-control').type(faker.address.city());
        cy.get('.cl-col-auto > .cl-btn').click();
    })
})