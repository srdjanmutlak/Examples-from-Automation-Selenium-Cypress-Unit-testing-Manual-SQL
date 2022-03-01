/**
     * Test: Go to "www.google.com" page, input "demoqa.com" in the search bar and search.
     * Hit the first result which will navigate to demoqa.com
     * Navigate to the Droppable element in Interactions section
     * Pick and drop the “Drag me” box into the “Drop here” box, print out the text from the “Drop
     * here” box and take a screenshot.
     * Click on the ToolTips link on the left hand side in the Widgets section.
     * Move your cursor to the “Hover me to see” button input element and print out the text from the pop-up tooltip.
     */

describe('Testing demoqa', () => {
    it('demoqa is clickable and active', () => {
    

    
    cy.visit('https://www.google.com')
    
    cy.get("input[title='Претражи']")
    .type("demoqa.com")
    .type('{enter}')
    
    
    cy.get("a[href='https://demoqa.com/']")
    .then((link) => {

        cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200)             //example how to check if link is clickable and active without visiting it
           
       })

    })

    it.skip('drag and drop', () => {
    


    cy.visit('https://demoqa.com/')
    
    cy.xpath("(//div[.='Interactions'])[1]")
    .click()
    
    cy.xpath("//span[normalize-space()='Droppable']")
    .click()

    cy.draganddrop('#draggable', "div[id='simpleDropContainer'] p")

   // cy.get('#draggable').drag("div[id='simpleDropContainer'] p")
    
    

        cy.get("div[id='simpleDropContainer'] p").should('have.text','Dropped!')
        .then((printText) => {

            cy.log(printText)
    
           })
    
    
        })

    it('using realHover', () => {
    
    cy.visit('https://demoqa.com/droppable')

    cy.xpath("//div[.='Widgets']")
    .click()

    cy.xpath("//span[normalize-space()='Tool Tips']")
    .click()

    cy.get('#toolTipButton')
    .realHover()
    
    cy.contains('You hovered over the Button')
    cy.get("#buttonToolTip")
    .should('have.text', 'You hovered over the Button')
    .find('.tooltip-inner')
    .invoke('text')
    .then((hoverText) => {

    cy.log(hoverText)
         })

        })
    
    })

