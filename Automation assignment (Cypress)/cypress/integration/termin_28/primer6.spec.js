describe('Percentage Calculator', () => {
    it('should correctly calculate 10% of 50.', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/')

        // Click on Percent Calculators
        cy.contains('Percentage Calculator').click()

        // Verify that url has changed
        cy.url().should('include', '/percent-calculator.html')

        // Enter value 10 in the first field of the percent Calculator
        cy.get('#cpar1')
            .type('10')

        // Enter value 50 in the second field of the percent Calculator
        cy.get('#cpar2')
            .type('50')

        // Click Calculate Button
        cy.get(':nth-child(4) > tbody > :nth-child(2) > td > [type="image"]').click()

        // Get the Result Text and Verify Result
        cy.get('#content > p.verybigtext > font > b')
            .should('have.text', '5')
    });
})