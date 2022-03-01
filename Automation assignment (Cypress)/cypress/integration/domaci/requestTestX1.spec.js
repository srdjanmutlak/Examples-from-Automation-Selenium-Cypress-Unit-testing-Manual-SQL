describe('Make an HTTP requestX', () => {
    beforeEach(() => {
        cy.loginRequest('admin@gmail.com', 'Bar5slova')     // Prijava na sistem preko cy.request u okviru beforeEach, jer se stanje između testova briše
    });

    it('Admin can add zgrada', () => {
        cy.addZgrada("Zrenjanin", "Malina", 12, 5)          

    });

    it('Admin can check all zgrada', () => {
        
        const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

    cy.request({                                                                
            method: 'GET',                                                      // Navodimo metodu i URL
            url:  'api/admin/zgrade?page=0&size=50',      // URL je u ovom slučaju npr: /api/admin/stan/1/ukloni/2 (ne navodimo potpun url, jer koristimo baseUrl)
            headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
                'X-Auth-Token': token,
            }

        }).then((response) => {     
            expect(response.status).to.eq(200) 
            expect(response.body[7]).to.have.property('broj', 12) 
            expect(response.body[7]).to.have.property('brojStanova', 5) 
            expect(response.body[7]).to.have.property('lokacija', "Zrenjanin") 
            expect(response.body[7]).to.have.property('ulica', "Malina") 
                                       
        })   

    });


})