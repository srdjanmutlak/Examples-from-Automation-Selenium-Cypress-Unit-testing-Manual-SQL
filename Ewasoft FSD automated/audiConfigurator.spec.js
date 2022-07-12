describe('Testing audi configurator', () => {

   it('Tests if checkboxes stay checked after closing the modal window', () => {

       Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false                                    
       })

   cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
   // username and password can be imprinted into a address for quicker access
   
   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[1]")
   .click()

   cy.xpath("(//div[@class='products-section__modal-content'])[1]").should('be.visible')

   cy.xpath("(//input[@value='278.60'])[1]").check()
   // check the unchecked box

   cy.xpath("(//input[@value='637.48'])[1]").check()
   // check the unchecked box

   cy.get("span[data-close='1']").click()
   //close the modal window

   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[1]")
   .click()
   //open it again

   cy.xpath("(//div[@class='products-section__modal-content'])[1]").should('be.visible')

   cy.xpath("(//div[@class='products-section__modal-content'])[1] //input").should('be.checked')

   // we check the unchecked boxes in the first modal then open the modal again to see if they are still checked
   
   cy.get("span[data-close='1']").click()
   //close the modal window 
   
   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[2]")
   .click()

   cy.xpath("(//div[@class='products-section__modal-content'])[2]").should('be.visible')

   cy.xpath("(//input[@value='278.60'])[2]").check()
   // check the unchecked box

   cy.xpath("(//input[@value='637.48'])[2]").check()
   // check the unchecked box

   cy.get("span[data-close='2']").click()
   //close the modal window

   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[2]")
   .click()
   //open it again

   cy.xpath("(//div[@class='products-section__modal-content'])[2]").should('be.visible')

   cy.xpath("(//div[@class='products-section__modal-content'])[2] //input").should('be.checked')

   // we check the unchecked boxes in the second modal then open the modal again to see if they are still checked
   
   cy.get("span[data-close='2']").click()
   //close the modal window
   
   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[3]")
   .click()

   cy.xpath("(//div[@class='products-section__modal-content'])[3]").should('be.visible')

   cy.xpath("(//input[@value='278.60'])[3]").check()
   // check the unchecked box

   cy.xpath("(//input[@value='637.48'])[3]").check()
   // check the unchecked box

   cy.get("span[data-close='3']").click()
   //close the modal window

   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[3]")
   .click()
   //open it again

   cy.xpath("(//div[@class='products-section__modal-content'])[3]").should('be.visible')

   cy.xpath("(//div[@class='products-section__modal-content'])[3] //input").should('be.checked')

   // we check the unchecked boxes in the third modal then open the modal again to see if they are still checked
   
   cy.get("span[data-close='3']").click()
   //close the modal window
   
   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[4]")
   .click()

   cy.xpath("(//div[@class='products-section__modal-content'])[4]").should('be.visible')

   cy.xpath("(//input[@value='278.60'])[4]").check()
   // check the unchecked box

   cy.xpath("(//input[@value='637.48'])[4]").check()
   // check the unchecked box

   cy.get("span[data-close='4']").click()
   //close the modal window

   cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[4]")
   .click()
   //open it again

   cy.xpath("(//div[@class='products-section__modal-content'])[4]").should('be.visible')

   cy.xpath("(//div[@class='products-section__modal-content'])[4] //input").should('be.checked')

   // we check the unchecked boxes in the fourth modal then open the modal again to see if they are still checked
   
   cy.get("span[data-close='4']").click()
   //close the modal window

 })

 it('Tests if calculator works properly inside Audi configurator window', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false                                    
    })

cy.visit('https://q-a-project:Mj9z6cR1qeDNosRP@q-a-project.dev.fsd.rs/')
// username and password can be imprinted into a address for quicker access

cy.xpath("(//button[@class='products-section__button'][normalize-space()='Buy Now'])[1]")
.click()

cy.xpath("(//div[@class='products-section__modal-content'])[1]").should('be.visible')

cy.xpath("(//input[@value='278.60'])[1]").check()

cy.xpath("(//input[@value='637.48'])[1]").check()
// we check the unchecked boxes to get unique max value
 
cy.xpath("(//div[@class='products-section__modal-content'])[1] //span[@class='products-section__modal-info-pricing']").then(($cells) => {
    const totals = $cells     //we mark the cells containing prices
        .toArray()
        .map((el) => el.innerText)
        .map((s) => s.replace(' EUR', ''))
        .map((s) => s.replace(',', '.'))     //we replace EUR and , for proper calculation 
        .map(parseFloat)
    const sum = Cypress._.sum(totals)
    cy.log(`Total should be ${sum}`)

    // cypress does not catch the first cell, first cell is 0 anyway
    
    cy.contains(".products-section__modal-button-price[data-price='29999']", sum+'€')
    // we confirm that the total sum in app is correct and it sums up prices correctly

    // this test fails, calculator doesn-t work
        })

    })

})
