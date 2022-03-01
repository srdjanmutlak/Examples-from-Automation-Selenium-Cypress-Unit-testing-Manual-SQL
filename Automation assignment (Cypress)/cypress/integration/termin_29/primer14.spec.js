describe('Scroll Demo', () => {
    it('cy.scrollTo() - scroll the window or element to a position', () => {
        cy.visit('https://example.cypress.io/commands/actions')

        // https://on.cypress.io/scrollTo
    
        // You can scroll to 9 specific positions of an element:
        //  -----------------------------------
        // | topLeft        top       topRight |
        // |                                   |
        // |                                   |
        // |                                   |
        // | left          center        right |
        // |                                   |
        // |                                   |
        // |                                   |
        // | bottomLeft   bottom   bottomRight |
        //  -----------------------------------
    
        // if you chain .scrollTo() off of cy, we will
        // scroll the entire window
        cy.scrollTo('bottom')

        cy.get('#scrollable-horizontal').scrollTo('right', { duration: 2000 })

        // or you can scroll to a specific coordinate:
        // (x axis, y axis) in pixels
        cy.get('#scrollable-vertical').scrollTo(250, 250, { duration: 2000 })

        // or you can scroll to a specific percentage
        // of the (width, height) of the element
        cy.get('#scrollable-both').scrollTo('75%', '25%', { duration: 2000 })

        // control the duration of the scroll (in ms)
        cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })
        })
})
