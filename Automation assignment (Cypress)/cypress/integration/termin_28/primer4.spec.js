describe('Multiple assertions', () => {
    it('are created with .and() command', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/')

        // Multiple assertions
        cy.contains('Financial Calculators')
            .should('have.attr', 'href')
            .and('include', 'calculator.html')
    })
})

