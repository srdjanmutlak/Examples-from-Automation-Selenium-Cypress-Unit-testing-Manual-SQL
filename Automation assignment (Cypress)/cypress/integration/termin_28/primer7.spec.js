describe('Percentage Calculator', () => {
    it('should check a checkbox button.', () => {
        // Visits the Calculator
        cy.visit('https://www.computerhope.com/jargon/c/checkbox.htm')

        // By default, .check() will check all checkboxes or radio elements
        cy.get('[type="checkbox"]')
            .not('[disabled]')
            .check()
            .should('be.checked')

        // .uncheck() all element
        cy.get('[type="checkbox"]')
            .uncheck()
            .should('not.be.checked')

        // check second checkbox 
        cy.get('#Example-2')
            .check()
            .should('be.checked')
            .as('secondCheckbox')    // create alias

        // reference the alias (we put @ in front of the name)
        cy.get('@secondCheckbox')
            .uncheck()
            .should('not.be.checked')
    })
})