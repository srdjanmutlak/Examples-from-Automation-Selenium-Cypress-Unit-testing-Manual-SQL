describe('Verify the drag and drop test', function() {
    const dataTransfer = new DataTransfer;
  
    function dndIt() {
      cy.get('#draggable')
        .trigger('dragstart', { dataTransfer });
  
      cy.xpath("//div[@id='simpleDropContainer']//div[@id='droppable']")
        .trigger('drop', { dataTransfer });
  
      cy.get('#draggable')
        .trigger('dragend');               // <-- seleniumeasy listens for this...
    }                                      // if left out, draggables are copied.
  
    beforeEach(function() {
      cy.viewport(1000, 600);
      cy.visit('https://demoqa.com/droppable');
    });
  
    it('Check whether the drag and drop of an item is working fine', function() {
      dndIt();
  
      cy.get("div[id='simpleDropContainer'] p").should('have.text','Dropped!')
        .then((printText) => {

            cy.log(printText)
    
           })
    });
  });