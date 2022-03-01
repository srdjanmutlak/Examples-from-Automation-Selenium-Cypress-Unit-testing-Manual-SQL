describe('Example of .then command', () => {
    it('with chaining', () => {
        cy.visit('https://admin-demo.nopcommerce.com/login')

        cy.get('h1')
            .then(($title) => {
                console.log('First message: ' + $title.text());

                expect($title.text()).to.equal("Admin area demo");

                return "This is the second message";
            })
            .then(($text) => {
                console.log('Second message: ' + $text);

                expect($text).to.equal("This is the second message");
            })


        cy.get('h1')
            .then(($title) => {
                console.log('First message: ' + $title.text());

                expect($title.text()).to.equal("Admin area demo");
            })
            .then(($text) => {
                console.log('Second message: ' + $text.text());

                expect($text.text()).to.equal("Admin area demo");
            })



        cy.get('h1')
            .then(($title) => {
                console.log('First message: ' + $title.text());
                expect($title.text()).to.equal("Admin area demo");

                cy.get('h2')
            })
            .then(($title2) => {
                console.log('Second message: ' + $title2.text());

                expect($title2.text()).to.equal("Defaults for admin area")
            })
    })
})