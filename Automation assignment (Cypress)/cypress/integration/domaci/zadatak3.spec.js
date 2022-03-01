describe('Zadatak 3', () => {
    it('Testing Wikivoyage link', () => {
        // Visit the Calculator.net website
        cy.visit('https://www.calculator.net/')

        // Click Scientific Calculator link
        cy.contains('Scientific Calculator')
            .click()

        // Click number 1 two times
        cy.get('[onclick="r(1)"]').dblclick()

        // Click + once
        cy.get('[onclick="r(\'+\')"]').click()

        // Click number 2 two times
        cy.get('[onclick="r(2)"]').dblclick()

        // Verify result

        // u konkretnom primeru testiramo rad kalkulatora, te zelimo da potvrdimo da je rezultat bas jednak 33,
        // a ne da li sadrzi 33 u nekom delu
        // cy.get('#sciOutPut')                    
        //     .should('contain', '33')  

        cy.get('#sciOutPut')         
            .should('have.text', '\u00a033')
    })
})