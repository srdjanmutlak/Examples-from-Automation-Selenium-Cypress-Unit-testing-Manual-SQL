describe('Percentage Calculator', () => {
    it('should check a radio button.', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/mortgage-payoff-calculator.html/')

        cy.url().should('include', '/mortgage-payoff-calculator.html')

        // Verify first radio button is not checked
        cy.get('#cpayoff1')
            .should('not.be.checked')


        // Select first radio button and verify it's checked
        cy.get('#cpayoff1')
            .check({force:true})
            .should('be.checked')

        // .check() accepts a value argument
        cy.get('[type="radio"]')
            .check('biweekly', {force:true})
            .should('be.checked')

        cy.pause()
    });
})
