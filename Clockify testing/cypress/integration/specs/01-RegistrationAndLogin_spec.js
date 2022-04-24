import { HomePage } from "../../fixtures/homePage"
let homePage = new HomePage();

describe('Registration and login suite', () => {
    it('Registration and login scenario', () => {

        homePage.navigateToHomePage();
        homePage.register();
        homePage.logout();
        homePage.login();

    })
})
