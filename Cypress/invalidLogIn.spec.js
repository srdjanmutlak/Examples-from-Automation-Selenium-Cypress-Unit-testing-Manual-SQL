describe('Invalid login tests', () => {
    it('login Prazno', () => {

        cy.visit('/')
        
    cy.get('#email')
      .focus()
      .blur()

    cy.get('#lozinka')
      .focus()
      .blur()

    cy.contains('Ulogujte se')
        .click()

        cy.get("div[class='alert alert-dismissible alert-danger'] strong").then(($a) => { 
            if ($a.text().includes('Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')) {
                cy.contains('Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
                cy.log('Test is valid')
            } else if ($a.text().includes('Email nije validnog formata!')) { 
                cy.contains('Email nije validnog formata!')
                cy.log('Test is still valid')  
            
            }
        })
        
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

        
        });
        


    })

    it('login Prazno polje Lozinka', () => {
        
        cy.visit('/')
        
    cy.get('#email')
      .type('admin@gmail.com')

    cy.get('#lozinka')
      .focus()
      .blur()

    cy.contains('Ulogujte se')
        .click()
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Mala Slova Lozinka', () => {
        
        cy.login('admin@gmail.com', 'aaaaaa')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Velika Slova Lozinka', () => {
        
        cy.login('admin@gmail.com', 'AAAAAA')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Brojevi Lozinka', () => {
        
        cy.login('admin@gmail.com', '111111')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Velika i Mala Slova Lozinka', () => {
        
        cy.login('admin@gmail.com', 'Baaaaa')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Mala Slova i broj Lozinka', () => {
        
        cy.login('admin@gmail.com', 'aaaaa1')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Velika Slova i Broj Lozinka', () => {
        
        cy.login('admin@gmail.com', 'AAAAA1')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login gde je lozinka od 5 slova i svi ostali kriterijumi ispravni', () => {
        
        cy.login('admin@gmail.com', 'Bar5s')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login pogresna lozinka od 7 slova i svi ostali kriterijumi ispravni', () => {
        
        cy.login('admin@gmail.com', 'Bar5slo')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Pogresan email ili lozinka!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Prazno polje Email', () => {
        
        cy.visit('/')
        
    cy.get('#email')
    .focus()
    .blur()

    cy.get('#lozinka')
      .type('Bar5slova')

    cy.contains('Ulogujte se')
        .click()
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Email nije validnog formata!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })

    it('login Nevalidan email', () => {
        
        cy.login('admingmail.com', 'Bar5slova')
        cy.get("div[class='alert alert-dismissible alert-danger'] strong").should('have.text', 'Email nije validnog formata!')
        cy.url().should('be.equal', 'http://localhost:8080/logovanje')

    })
