describe('Fixture Test', () => {
    let city

    // Example of cy.fixture command
    beforeEach(() => {
        cy.fixture('city').then((c) => {
            city = c;
        });

        // bolji pristup
        cy.fixture('city').as('cityAlias');   // Napomena: aliase ne treba kreirate u before jer ce onda samo raditi u prvom testu. Pre svakog testa aliasi se resetuju
    })

    it('has loaded city', () => {
        expect(city.name).to.equal('Novi Sad')

        cy.get('@cityAlias').then((city) => {
            expect(city.name).to.equal('Novi Sad')
        })        
    });

    it('load city with cy.fixture command', () => {
        cy.fixture('city')
            .should('deep.equal', { name: 'Novi Sad' })
    })

    // it('primeri', ()=> {
        // cy.fixture('countries').as('countries')

        // ovo nece raditi, zato sto komanda 'as' nije jos izvrsena
        // const myCounty = this.countries[0]

        // ovako moze
        // cy.fixture('countries').then((countries) => {
        //      const myCounty = countries[0]
        
        //      cy.get('h1').should('contain', myCounty.name)
    //  })
   // }
})