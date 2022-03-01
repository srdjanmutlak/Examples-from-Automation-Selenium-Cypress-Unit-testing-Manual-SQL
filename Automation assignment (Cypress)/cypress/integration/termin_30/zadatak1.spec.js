describe('Reset Password Page', () => {                             // Primer promene lozinke sa jednim pozitivnim i jednim negativnim testom
    beforeEach(() => {                                              // Potrebno je dodati preostale negativne testove koje smo naveli na času 
        cy.login('predSkup@gmail.com', 'Bar5slova')   

        cy.contains('Promena lozinke').click()      
    });

    describe('President can change his password', () => {           // Pozitivan test
        it('valid data', () => { 
            cy.resetPassword('Bar5slova', 'Bar6slova');             // Pozivamo komandu za promenu lozinke. Kreirali smo komandu, jer će se koristiti na više mesta.
    
            cy.get('.toast-success').should('have.text', ' Lozinka uspesno izmenjena! ')   
    
            cy.login('predSkup@gmail.com', 'Bar6slova')             // Prijava na sistem sa novom lozinkom
        });

        afterEach(() => {
            cy.contains('Promena lozinke').click()      
            cy.resetPassword('Bar6slova', 'Bar5slova');             // Vraćamo lozinku na staru vrednost
        })
    });

    describe('President cannot change his password', () => {        // Negativni testovi
        it('old password is wrong', () => {
            cy.resetPassword('Bar6slova', 'Bar7slova');            

            cy.get('.toast-error').should('have.text',  ' Pogresna lozinka! ') 

        });
    });
})

//              testiranje praznog polja
// .type očekuje da primi neku vrednost, te nije moguće proslediti prazan string ""
// Ponašanje, slično željenom, možemo da postignemo sa .clear() ili .invoke('val', ''), 
// Možemo se igrati sa fokusom, isto onako kako to radi i korisnik kada otvori stranicu i dobije error poruku ispod input polja
// npr.         cy.get('input[name=staraLozinka]').focus();
// pa potom     cy.get('input[name=novaLozinka]').focus();
// i onda možemo izvršiti asertaciju da se prikazala error poruka ispod input polja za staru lozinku
