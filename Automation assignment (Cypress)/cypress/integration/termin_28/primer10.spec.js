describe('Multi locator', () => {
    it('should locate all "a" tags.', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/')

        // Check how many links are on the page
        cy.get('a')
            .should('have.length', 55)
    });
})
