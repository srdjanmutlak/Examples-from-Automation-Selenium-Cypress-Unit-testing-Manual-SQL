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
        .should('eq', 200)
           
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

