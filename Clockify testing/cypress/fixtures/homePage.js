const faker = require('faker');
const randomData = {
    email: faker.internet.email(),
}
export class HomePage {
    constructor(email) {
        this._email = randomData.email;
    }
    navigateToHomePage() {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false
        })
        cy.visit('https://clockify.me/');
    }

    register() {
        cy.get('#menu-open > img').click();
        cy.get(':nth-child(5) > a > .header__row__item_right--signin_btn').click()
        cy.get(':nth-child(1) > .cl-form-control').type(this._email);
        cy.get(':nth-child(2) > .cl-form-control').type('testdemo');
        cy.get(':nth-child(4) > .cl-btn').click();
        cy.writeFile('./cypress/fixtures/email.json', { email: this._email });

    }

    logout() {
        cy.get('.cl-align-items-center > .cl-pr-0').click();
        cy.get('.cl-dropdown-menu > :nth-child(9)').click();
    }

    navigateToLogin() {
        cy.get('#menu-open > img').click();
        cy.get('.header__row__item--mobile > :nth-child(4) > a').click();
    }

    login() {
        cy.readFile('./cypress/fixtures/email.json').then((user) => {

            cy.get(':nth-child(1) > .cl-form-control').type(user.email);

            cy.get(':nth-child(2) > .cl-form-control').type('testdemo');

            cy.get(':nth-child(5) > .cl-btn').click();
        })
    }

    closeNotificationPopup() {
        // if (cy.get('.cl-align-items-center > .cl-dropdown-large > .cl-dropdown-toggle').click());
        //cy.get('#twotabsearchtextbox').click().get('#searchDropdownBox').select('Books',{force: true})
        cy.get('body').then((body) => {
            console.log(body)
            if (body.find('[notifications=""]').length > 0) {
                cy.get('.cl-dropdown-large > .cl-dropdown-toggle > img').click();
            }
        })

    }


}