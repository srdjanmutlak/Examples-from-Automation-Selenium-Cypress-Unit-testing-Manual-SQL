describe('Our first Implicit Assertion', () => {
    it('should confirm that button has text Search', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/')

        // Create implicit assertion
        cy.get('#bluebtn')
            .should('have.text', 'Search')
    })
})