describe('Make an HTTP request', () => {
    beforeEach(() => {
        cy.loginRequest('admin@gmail.com', 'Bar5slova')     // Prijava na sistem preko cy.request u okviru beforeEach, jer se stanje između testova briše
    });

    it('Admin can add tenant from the flat', () => {
        cy.addTenant(2, 6);                              

         
    });

    it('Admin can delete tenant from the flat', () => {
        cy.deleteTenant(2, 6);                              // Brisanje stanara sa id: 3 iz stana sa brojem: 1 preko cy.request

        
    });

    it('Admin can get all stanari', () => {
        
        const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

    cy.request({                                                                
            method: 'GET',                                                      // Navodimo metodu i URL
            url:  '/api/admin/stan/1/stanari',     
            headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
                'X-Auth-Token': token,
            }

        }).then((response) => {     
            expect(response.status).to.eq(200) 
            expect(response.body[0]).to.have.property("naziv", "Gospodin Predsednik") 
            expect(response.body[0]).to.have.property("email", "predSkup@gmail.com") 
            expect(response.body[0]).to.have.property("uloga", "PREDSEDNIK_SKUPSTINE") 

                                       
        })   

    });

    
})
