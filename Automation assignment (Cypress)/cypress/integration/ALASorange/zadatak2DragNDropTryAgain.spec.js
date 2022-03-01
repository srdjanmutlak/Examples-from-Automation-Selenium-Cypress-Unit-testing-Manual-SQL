describe('Testing orangehrm', () => {
    it('search form', () => {
    

    
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

    it.only('search form', () => {
    


    cy.visit('https://demoqa.com/')
    
    cy.xpath("(//div[.='Interactions'])[1]")
    .click()
    
    cy.xpath("//span[normalize-space()='Droppable']")
    .click()

    cy.get('#draggable')
      .contains('Drag me')
      .trigger('dragstart', { dataTransfer: new DataTransfer })
      .trigger('dragover')
      .trigger('dragleave')
    cy.get('#draggable')
      .xpath("(//div[@id='droppable'])[1]")
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');
    
    })

})

   // cy.get("div[id='simpleDropContainer'] p").should('have.text','Dropped!')