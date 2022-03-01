describe('Percentage Calculator', () => {
    it('should enter value in the first field and clear it.', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/')

        // Click on Percent Calculators
        cy.contains('Percentage Calculator').click()

        // Verify that url has changed
        cy.url().should('include', '/percent-calculator.html')

        // Enter value 10 in the first field of the percent Calculator
        cy.get('#cpar1')
            .type('10')
            .should('have.value', '10')

        cy.get('#cpar1')
            .clear()
            .should('have.value', '')
    });
})