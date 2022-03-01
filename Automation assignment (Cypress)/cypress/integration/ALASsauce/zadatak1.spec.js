describe('Testing saucedemo', () => {
    it('task1', () => {

        cy.signInSauce('standard_user', 'secret_sauce')      //Go to https://www.saucedemo.com/, Log in to the site

        cy.get('#add-to-cart-sauce-labs-backpack').click()             //Add an item from the list to the cart
       
        cy.get('#remove-sauce-labs-backpack').should('have.text', 'Remove')

        cy.get('.shopping_cart_badge').should('have.text', '1')    //Verify that the cart badge is updated correctly

        cy.contains('Sauce Labs Bike Light').click()         //Open another item’s details page
        
        cy.get('#add-to-cart-sauce-labs-bike-light').click()             //Add the item to the cart

        cy.get('.shopping_cart_link').click()             //Open the cart

        cy.xpath("//div[@class='cart_item']").should(($lis) => {
        expect($lis).to.have.length(2)
    })

        cy.xpath("//div[@class='inventory_item_name']").should(($lis) => {
        expect($lis).to.have.length(2)
        expect($lis.eq(0)).to.have.text('Sauce Labs Backpack')
        expect($lis.eq(1)).to.have.text('Sauce Labs Bike Light')

        }) // Verify that the correct items are present (2 different items)
    
        cy.get('#remove-sauce-labs-backpack').click() //Remove the first item from the cart

        cy.xpath("//div[@class='inventory_item_name']").should(($lis) => {
        expect($lis).to.have.length(1)
        expect($lis.eq(0)).to.have.text('Sauce Labs Bike Light')

        })  //Verify that the correct item is present (1 item)
        
        cy.get('#checkout').click()             //Continue to the Checkout page

        cy.checkoutForm('Babyface', 'BigGeorge','24430')
        cy.get('#finish').click()                     //Complete the checkout form, Complete the order

        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')

    })  //Verify that the order is completed successfully with the displayed message

    it('task2', () => {

        cy.signInSauce('standard_user', 'secret_sauce') 
        //Go to https://www.saucedemo.com/, Log in to the site

        cy.get('.product_sort_container').should('have.text', 'Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)')
        //Verify that the items are sorted by Name ( A TO Z )
        
        cy.get('.product_sort_container')
        .select('Name (Z to A)')                //Change the sorting to Name ( Z TO A)
        
        cy.xpath("//div[@class='inventory_item_name']").should(($lis) => {
        expect($lis).to.have.length(6)
        expect($lis.eq(0)).to.have.text('Test.allTheThings() T-Shirt (Red)')
        expect($lis.eq(1)).to.have.text('Sauce Labs Onesie')
        expect($lis.eq(2)).to.have.text('Sauce Labs Fleece Jacket')
        expect($lis.eq(3)).to.have.text('Sauce Labs Bolt T-Shirt')
        expect($lis.eq(4)).to.have.text('Sauce Labs Bike Light')
        expect($lis.eq(5)).to.have.text('Sauce Labs Backpack')

        }) //Verify that the items are sorted correctly

        cy.get('.product_sort_container')
        .select('Price (low to high)')             //Change the sorting to Price (low to high)

        cy.xpath("//div[@class='inventory_item_price']").should(($lis) => {
        expect($lis).to.have.length(6)
        expect($lis.eq(0)).to.have.text('$7.99')
        expect($lis.eq(1)).to.have.text('$9.99')
        expect($lis.eq(2)).to.have.text('$15.99')
        expect($lis.eq(3)).to.have.text('$15.99')
        expect($lis.eq(4)).to.have.text('$29.99')
        expect($lis.eq(5)).to.have.text('$49.99')

        }) //Verify that the items are sorted correctly

        cy.get('.product_sort_container')
        .select('Price (high to low)')                  //Change the sorting to Price (high to low)

        cy.xpath("//div[@class='inventory_item_price']").should(($lis) => {
        expect($lis).to.have.length(6)
        expect($lis.eq(0)).to.have.text('$49.99')
        expect($lis.eq(1)).to.have.text('$29.99')
        expect($lis.eq(2)).to.have.text('$15.99')
        expect($lis.eq(3)).to.have.text('$15.99')
        expect($lis.eq(4)).to.have.text('$9.99')
        expect($lis.eq(5)).to.have.text('$7.99')
        })

    })  // Verify that the items are sorted correctly

    it('task3', () => {

    cy.signInSauce('Babyface', 'Beetlejuice')
    //Go to https://www.saucedemo.com/, Enter an incorrect username, Enter an incorrect password, Click on the Login button

    cy.get("h3[data-test='error']").should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    
    cy.url().should('eq', 'https://www.saucedemo.com/') 

    }) //Verify that the user cannot log in with incorrect credentials

})