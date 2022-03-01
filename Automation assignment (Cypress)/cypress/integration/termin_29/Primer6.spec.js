const country = require('../../fixtures/country.json')
const example = require('../../fixtures/example.json')

describe('Fixture Tests with Require', () => {
    it('load country', () => {
        expect(country.name).to.equal('Serbia')
    })

    it('load email', () => {
        expect(example.email).to.equal('hello@cypress.io')
    })
})


