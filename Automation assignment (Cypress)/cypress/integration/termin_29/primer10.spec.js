describe('Failure example', () => {
    let city

    before(() => {
        cy.fixture('city').then((c) => {
            city = c
        })
    })

    it('to demonstrate videos', () => {
        expect(city.name).to.equal('Belgrade')
    })

})