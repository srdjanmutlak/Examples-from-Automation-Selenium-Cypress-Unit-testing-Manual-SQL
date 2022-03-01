describe('Return values & Multi locator', () => {
    it('Return values', ()=> {
        cy.visit('https://www.calculator.net/');

        ///////////////////////////
        // const button = cy.get('#bluebtn');
        // button.click();       // Ovo neće raditi. Nije moguce dodeliti ili raditi nesto sa povratnom vrednoscu bilo koje Cypress komande
        ///////////////////////////

        cy.get('#bluebtn').then(($btn) => {
            // store the button's text
            const txt = $btn.text()
          
            // click on the link
            cy.contains('Mortgage Calculator').click();
          
            // compare the two buttons' text and make sure they are the same
            cy.get('#bluebtn').should('have.text', txt);
          })

        // Primer promene klase button-a nakon klika
        // cy.get('#bluebtn').then(($btn) => {
        //   const class = $btn.attr('class')

        //   cy.wrap($btn).click().should('not.have.class', class)
        // })

    })

    it('Multi locator should locate all "a" tags.', () => {
        // Visits the Calculator
        cy.visit('https://www.calculator.net/')

        // Check how many links are on the page
        cy.get('a')
            .should('have.length', 55);

        cy.get('a')
            .each(($el, index, $list) => {
                console.log(index + ' ' + $el.text())
                if ($el.text() === 'Mortgage Calculator') {
                    cy.wrap($el).click();
                }
            })
            // .then(($list) => {
            //     expect($list).to.have.length(55) 
            // });
    })
});