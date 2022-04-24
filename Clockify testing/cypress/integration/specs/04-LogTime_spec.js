import { HomePage } from "../../fixtures/homePage"
let homePage = new HomePage();
let faker = require('faker')

describe('Log time suite', () => {

    it('Log time scenario', () => {

        //first navigate to home page and login
        homePage.navigateToHomePage();
        homePage.navigateToLogin();
        homePage.login();
        homePage.closeNotificationPopup();

        cy.get('.cl-d-block > .cl-dropdown > .cl-d-flex').click(); //navigate to manual insert of time option
        cy.get('.cl-no-focus-tabindex > .ng-star-inserted').click();
        // First log time
        cy.get('.cl-position-relative > .cl-form-control').type(faker.random.words(5));
        cy.get('.recorder-project-wrapper > .cl-dropdown.cl-d-flex > .cl-cut-text > project-picker-label > .cl-dropdown > .cl-component-divided-left > .cl-d-flex').click();
        cy.get(':nth-child(1) > .cl-item-between > .cl-project-name').click();// select project
        cy.get('.cl-timetracker-entry-actions > .cl-w-100 > .cl-single-date-picker > .cl-text-right > .cl-form-control').type('22:00');
        cy.get('.cl-timetracker-entry-actions > .cl-w-100 > .cl-single-date-picker > :nth-child(3) > .cl-form-control').type('23:00');
        cy.get(':nth-child(5) > .cl-btn-sm').click(); // log time button    
        // Second log time
        cy.get('.cl-position-relative > .cl-form-control').type(faker.random.words(6));
        cy.get('.recorder-project-wrapper > .cl-dropdown.cl-d-flex > .cl-cut-text > project-picker-label > .cl-dropdown > .cl-component-divided-left > .cl-d-flex').click();
        cy.get(':nth-child(1) > .cl-item-between > .cl-project-name').click();
        cy.get('.cl-timetracker-entry-actions > .cl-w-100 > .cl-single-date-picker > .cl-text-right > .cl-form-control').type('21:00');
        cy.get('.cl-timetracker-entry-actions > .cl-w-100 > .cl-single-date-picker > :nth-child(3) > .cl-form-control').type('22:00');
        cy.get(':nth-child(5) > .cl-btn-sm').click(); // log time button    
        // Third log time
        cy.get('.cl-position-relative > .cl-form-control').type(faker.random.words(7));
        cy.get('.recorder-project-wrapper > .cl-dropdown.cl-d-flex > .cl-cut-text > project-picker-label > .cl-dropdown > .cl-component-divided-left > .cl-d-flex').click();
        cy.get(':nth-child(1) > .cl-item-between > .cl-project-name').click();
        cy.get('.cl-timetracker-entry-actions > .cl-w-100 > .cl-single-date-picker > .cl-text-right > .cl-form-control').type('20:00')
        cy.get('.cl-timetracker-entry-actions > .cl-w-100 > .cl-single-date-picker > :nth-child(3) > .cl-form-control').type('21:00');
        cy.get(':nth-child(5) > .cl-btn-sm').click(); // log time button    
    })
})
