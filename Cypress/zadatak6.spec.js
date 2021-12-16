describe('Testiranje dropdown, sastanci skupstine', () => {
beforeEach(() => {

    cy.visit("http://localhost:8080") 
    cy.loginRequest('predSkup@gmail.com', 'Bar5slova') 
    cy.login('predSkup@gmail.com', 'Bar5slova');   

   
   cy.get(':nth-child(4) > a').click()
    cy.contains("Sastanci skupstine").click()

});

it('select svi gde prikazuje tri sastanka', () => {

    cy.xpath("//div[@class='row blob']").should(($lis) => {
        expect($lis).to.have.length(3)
        expect($lis.eq(0)).to.contain('SASTANAK JE U TOKU')
        expect($lis.eq(1)).to.contain('SASTANAK JE ZAVRSEN')
        expect($lis.eq(2)).to.contain('SASTANAK JE ZAVRSEN')


                  
})
    cy.get('.custom-select').should('contain', 'Svi')
})



it('select Sastanci u toku gde prikazuje jedan sastanak', () => {

    cy.get('.custom-select')
            .select('Sastanci u toku')

    cy.xpath("//div[@class='row blob']").should(($lis) => {
        expect($lis).to.have.length(1)
        expect($lis.eq(0)).to.contain('SASTANAK JE U TOKU')
                  
})

    cy.xpath("//div[@class='row blob'] //span[.='SASTANAK JE U TOKU']")
    .should('have.class','green-impact-text')   // slova prikazana u odgovarajucoj zelenoj boji

    cy.get('.custom-select').should('contain', 'Sastanci u toku')
})



it('select Buduci Sastanci gde nema sastanaka', () => {

    cy.get('.custom-select')
            .select('Buduci Sastanci') 

    cy.get('.custom-select').should('contain', 'Buduci Sastanci')

    cy.xpath("//div[@class='row blob']").should('not.exist') //nema buducih sastanaka



        
                
})

it('select Prosli Sastanci gde prikazuje dva sastanka', () => {

    cy.get('.custom-select')
            .select('Prosli Sastanci') 

    cy.xpath("//div[@class='row blob']").should(($lis) => {
        expect($lis).to.have.length(2)
        expect($lis.eq(0)).to.contain('SASTANAK JE ZAVRSEN')
        expect($lis.eq(1)).to.contain('SASTANAK JE ZAVRSEN')
                  
})
    cy.xpath("//div[@class='row blob'] //span[.='SASTANAK JE ZAVRSEN']")
    .should('have.class','super-high-impact-text') // slova prikazana u odgovarajucoj crvenoj boji

    cy.get('.custom-select').should('contain', 'Prosli Sastanci')
})

it('predSkup Logout', () => {
        
    const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

cy.request({                                                                
        method: 'GET',                                                      // Navodimo metodu i URL
        url:  'api/izlogujSe',     
        headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
            'X-Auth-Token': token,
        }

    }).then((response) => {     
        expect(response.status).to.eq(200) 
 

                                   
    })     

})


})

