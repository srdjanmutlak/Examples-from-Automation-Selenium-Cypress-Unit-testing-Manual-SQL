// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Example of Custom Command
Cypress.Commands.add('signIn', (email, password) => {
    cy.visit('https://admin-demo.nopcommerce.com/login')

    cy.get('input[name=Email]')
        .clear()
        .type(email)

    cy.get('input[name=Password]')
        .clear()
        .type(password)
        
    cy.get('.button-1')
        .click()
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')

    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(password)
        
    cy.contains('Ulogujte se')
        .click()
});

Cypress.Commands.add('addZgrada1', (mesto, ulica, broj, brojStanova) => {

    cy.get('#mesto')
        .clear()
        .type(mesto)

    cy.get('#ulica')
        .clear()
        .type(ulica)

    cy.get('#broj')
        .clear()
        .type(broj)

    cy.get('#brojStanova')
        .clear()
        .type(brojStanova)
        
   // cy.get("button[type='submit']")
     //   .click()
});

Cypress.Commands.add('addStanar', (email, lozinka, ime, prezime) => {

    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(lozinka)

    cy.get('#ime')
        .clear()
        .type(ime)

    cy.get('#prezime')
        .clear()
        .type(prezime)
        
    cy.get("button[type='submit']")
        .click()
});

Cypress.Commands.add('resetPassword', (oldPassword, newPassword) => {
    cy.get('input[name=staraLozinka]')
        .clear()
        .type(oldPassword)

    cy.get('input[name=novaLozinka]')
        .clear()
        .type(newPassword)
        

    cy.get('input[name=potvrdaNoveLozinke]')
        .clear()
        .type(newPassword)

    cy.contains('Promenite lozinku').click()	
});

Cypress.Commands.add('loginRequest', (email, password) => {
    cy.request('POST', '/api/ulogujSe', {lozinka:password, email:email})       // Navodimo metodu, url i objekat koji se šalje
             .then((response) => {                                             // Ne moramo da navodimo potpuni url: http://localhost:8080/api/ulogujSe, jer smo naveli baseUrl u cypress.json fajlu
                expect(response.status).to.eq(200)                             // Proveravamo da li je status code == 200
                expect(response.body).to.have.property('token')                // Proveravamo da li postoji property token
                window.localStorage.setItem('jwt', response.body.token)        // Postavljamo token u localStorage. U localStorage-u key će biti 'jwt', a value će biti baš taj token. Da bismo proverili da li je token dobro postavljen: Desni klik > Inspect > Application > Storage > Local Storage
        })

        // Zahtev mozemo da napišemo i na dolenaveden način, gde tačno navodimo šta je koji parametar (možete izabrati bilo koji pristup)
        // cy.request({
        //     method: 'POST',
        //     url: '/api/ulogujSe',
        //     body: {
        //         lozinka: password,
        //         email: email
        //     }
        //   }).then((response) => {                                                                
        //     expect(response.status).to.eq(200)                                              
        //     expect(response.body).to.have.property('token')                             
        //     window.localStorage.setItem('jwt', response.body.token) 
        // });
});



Cypress.Commands.add('deleteTenant', (flatNumber, tenantId) => {
    const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

    cy.request({                                                                
            method: 'PUT',                                                      // Navodimo metodu i URL
            url:  '/api/admin/stan/' + flatNumber + '/ukloni/' + tenantId,      // URL je u ovom slučaju npr: /api/admin/stan/1/ukloni/2 (ne navodimo potpun url, jer koristimo baseUrl)
            headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
                'X-Auth-Token': token,
            }
        }).then((response) => {     
            expect(response.status).to.eq(200)                                  // Proveravamo da li je status code == 200
            expect(response.body.id).to.eq(tenantId)                            // Za ovaj konkretni zahtev, za brisanje stanara iz stana, kao odgovor (response) se vraća objekat, koji predstavlja tog jednog stanara koji je obrisan
        })                                                                      // Znamo da smo obrisali stanara koji ima prosleđeni tenantId, pa očekujemo da i objekat koji je stigao sa servera sadrži upravo tog stanara, tj. da je u okviru objekta polje id == tenantId
});

Cypress.Commands.add('addTenant', (flatNumber, tenantId) => {
    const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

    cy.request({                                                                
            method: 'PUT',                                                      // Navodimo metodu i URL
            url:  '/api/admin/stan/' + flatNumber + '/dodeli/' + tenantId,      // URL je u ovom slučaju npr: /api/admin/stan/1/ukloni/2 (ne navodimo potpun url, jer koristimo baseUrl)
            headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
                'X-Auth-Token': token,
            }
        }).then((response) => {     
            expect(response.status).to.eq(200)                                  // Proveravamo da li je status code == 200
            expect(response.body.id).to.eq(tenantId)                            // Za ovaj konkretni zahtev, za brisanje stanara iz stana, kao odgovor (response) se vraća objekat, koji predstavlja tog jednog stanara koji je obrisan
        })                                                                      // Znamo da smo obrisali stanara koji ima prosleđeni tenantId, pa očekujemo da i objekat koji je stigao sa servera sadrži upravo tog stanara, tj. da je u okviru objekta polje id == tenantId
});

Cypress.Commands.add('addZgrada', (mesto, ulica1, broj1, brojStanova1) => {
    const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

    cy.request({                                                                
            method: 'POST',                                                      // Navodimo metodu i URL
            url:  '/api/admin/zgrada/dodaj',      // URL je u ovom slučaju npr: /api/admin/stan/1/ukloni/2 (ne navodimo potpun url, jer koristimo baseUrl)
            headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
                'X-Auth-Token': token,
            },
            body: {
                broj: broj1,
                brojStanova: brojStanova1,
                lokacija: mesto,
                ulica: ulica1
              }
        }).then((response) => {     
            expect(response.status).to.eq(200) 
            expect(response.body).to.have.property('broj', broj1) 
            expect(response.body).to.have.property('brojStanova', brojStanova1) 
            expect(response.body).to.have.property('lokacija', mesto) 
            expect(response.body).to.have.property('ulica', ulica1) 
                                       
        })                                                                      
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:8080')

    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(password)
        .should('have.attr', 'type', 'password') //proverila sam da li je pass obscured

    cy.get('.btn')
        .click()
})

Cypress.Commands.add('addBuilding', (mesto, ulica, broj, brojStanova) => {
    cy.get('#mesto')
        .clear()
        .type(mesto)

    cy.get('#ulica')
        .clear()
        .type(ulica)

    cy.get('#broj')
        .clear()
        .type(broj)

    cy.get('#brojStanova')
        .clear()
        .type(brojStanova)

    cy.get('.col-lg-9 > .btn-primary')
        .click()
})

Cypress.Commands.add('addStanara', (email, lozinka, ime, prezime) => {
    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(lozinka)

    cy.get('#ime')
        .clear()
        .type(ime)

    cy.get('#prezime')
        .clear()
        .type(prezime)

    cy.get('.col-lg-9 > .btn-primary')
        .click()
})
Cypress.Commands.add('changePass', (staralozinka, novaLozinka, potvrdaNoveLozinke) => {

    cy.get('#staraLozinka')
        .clear()
        .type(staralozinka)
        .should('have.attr', 'type', 'password')

    cy.get('#novaLozinka')
        .clear()
        .type(novaLozinka)
        .should('have.attr', 'type', 'password')

    cy.get('#potvrdaNoveLozinke')
        .clear()
        .type(potvrdaNoveLozinke)
        .should('have.attr', 'type', 'password')

    // cy.get('.center > .btn')        // dugme smo zakomentarisali ovde da bi mogli da proveravamo da li je disabled ili ne u testovima
    // .click()
})


Cypress.Commands.add('addFirma', (email, lozinka, naziv, mesto, ulica, broj, brojTelefona) => {
    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(lozinka)

    cy.get('#naziv')
        .clear()
        .type(naziv)

    cy.get('#mesto')
        .clear()
        .type(mesto)

    cy.get('#ulica')
        .clear()
        .type(ulica)

    cy.get('#broj')
        .clear()
        .type(broj)

    cy.get('#brojTelefona')
        .clear()
        .type(brojTelefona)

    // cy.get('.col-lg-9 > .btn-primary')           //zakomentarisano zbog negativnih testova
    //     .click()
})

Cypress.Commands.add('addInstitution', (email, lozinka, naziv, mesto, ulica, broj, brojTelefona) => {
    cy.get('#email')
        .clear()
        .type(email)

    cy.get('#lozinka')
        .clear()
        .type(lozinka)

    cy.get('#naziv')
        .clear()
        .type(naziv)

    cy.get('#mesto')
        .clear()
        .type(mesto)

    cy.get('#ulica')
        .clear()
        .type(ulica)

    cy.get('#broj')
        .clear()
        .type(broj)

    cy.get('#brojTelefona')
        .clear()
        .type(brojTelefona)

     cy.get('.col-lg-9 > .btn-primary')          
         .click()
})

Cypress.Commands.add('registerFirm', (adresa1, brojTelefona1, email1, lozinka1, naziv1) => {
    const token = window.localStorage.getItem('jwt');                           // Čitamo token koji smo sačuvali

    cy.request({                                                                
            method: 'POST',                                                      // Navodimo metodu i URL
            url:  '/api/admin/firma/dodaj',      // URL je u ovom slučaju npr: /api/admin/stan/1/ukloni/2 (ne navodimo potpun url, jer koristimo baseUrl)
            headers: {                                                          // Postavljamo token u okviru headers, da bi request mogao da se izvrši. Ako token nije postavljen dobija se error 401 Unauthorized
                'X-Auth-Token': token,
            },
            body: {
                adresa: adresa1,
                brojTelefona: brojTelefona1,
                email: email1,
                lozinka: lozinka1,
                naziv: naziv1
              }
        }).then((response) => {     
            expect(response.status).to.eq(200) 
           
                                       
        })                                                                      
});

Cypress.Commands.add('getIframe', (iframe) => {
    return cy.get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
})

Cypress.Commands.add('addNewCandidate', (firstName, lastName, email) => {

    cy.frameLoaded('#noncoreIframe')

    cy.iframe().find('#addCandidate_firstName')
        .click()
        .type(firstName)

    cy.iframe().find('#addCandidate_lastName')
        .click()
        .type(lastName)

    cy.iframe().find('#addCandidate_email')
        .click()
        .type(email)

    cy.iframe().find('#textarea_addCandidate_vacancy')          
        .click()

    cy.iframe().xpath("//p[@competancy-id='44']")          
        .click()
    
    cy.iframe().find('#applied_date')          
        .click()

    cy.iframe().find('.picker__day.picker__day--infocus.picker__day--today.picker__day--selected.picker__day--highlighted')          
        .click()


        cy.fixture('test.pdf').then(fileContent => {
            cy.iframe().find('#addCandidate_resume')
            .click()
            .attachFile({
                fileContent: fileContent.toString(),
                fileName: 'test.pdf',
              //  mimeType: 'pdf'
            });
        });

    cy.iframe().find('#saveCandidateButton')          
        .click()

    })

//For Cypress drag and drop custom command
Cypress.Commands.add('draganddrop', (dragSelector, dropSelector) => {
    cy.get(dragSelector).should('exist')
        .get(dropSelector).should('exist');

    const draggable = Cypress.$(dragSelector)[0]; // Pick up this
    const droppable = Cypress.$(dropSelector)[0]; // Drop over this

    const coords = droppable.getBoundingClientRect()
    draggable.dispatchEvent(new MouseEvent('mousedown'));
    draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
    draggable.dispatchEvent(new MouseEvent('mousemove', {
        clientX: coords.left + 10,
        clientY: coords.top + 10  // A few extra pixels to get the ordering right
    }));
    draggable.dispatchEvent(new MouseEvent('mouseup'));
    return cy.get(dropSelector);
})

Cypress.Commands.add('signInSauce', (username1, password11) => {
    cy.visit('/')

    cy.get('#user-name')
        .clear()
        .type(username1)

    cy.get('#password')
        .clear()
        .type(password11)
        
    cy.get('#login-button')
        .click()
});

Cypress.Commands.add('checkoutForm', (firstName1, lastName1, postalCode) => {

    cy.get('#first-name')
        .clear()
        .type(firstName1)

    cy.get('#last-name')
        .clear()
        .type(lastName1)

    cy.get('#postal-code')
        .clear()
        .type(postalCode)
        
    cy.get('#continue')
        .click()
});


require('cypress-iframe');

import 'cypress-file-upload';

import '@4tw/cypress-drag-drop'

import "cypress-real-events/support";


