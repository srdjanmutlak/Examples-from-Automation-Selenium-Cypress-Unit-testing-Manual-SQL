describe('Interest Calculator', () => {
    it('should select the "continuously" option from a dropdown.', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/interest-calculator.html')

        cy.url().should('include', '/interest-calculator.html')

        // at first, annually is selected
        cy.get('#ccompound')
            .should('have.value', 'annually')

        // Select option continuously  
        cy.get('#ccompound')
            .select('continuously')

        // Confirm the continuously was selected
        cy.get('#ccompound')
            .should('have.value', 'continuously')
    });
})
