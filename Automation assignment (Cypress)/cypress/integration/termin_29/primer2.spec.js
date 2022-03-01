describe('Example of .then command', () => {
    it('with list of items', () => {
        cy.visit('https://example.cypress.io/commands/connectors')

        cy.get('.connectors-list>li').then(function ($lis) {
            expect($lis).to.have.length(3)
            expect($lis.eq(0)).to.contain('Walk the dog')
            expect($lis.eq(1)).to.contain('Feed the cat')
            expect($lis.eq(2)).to.contain('Write JavaScript')
        })
    })
})