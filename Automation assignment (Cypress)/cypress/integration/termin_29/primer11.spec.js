// Primer za upotrebu prečice kod prijave na sistem.
// sa cy.request možemo da šaljemo zahtev

// describe('The Dashboard Page', () => {
//     beforeEach(() => {
//       // reset and seed the database prior to every test
//       cy.exec('npm run db:reset && npm run db:seed')
  
//       // seed a user in the DB that we can control from our tests
//       // assuming it generates a random password for us
//       cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
//         .its('body')
//         .as('currentUser')
//     })
  
//     it('logs in programmatically without using the UI', function () {
//       // destructuring assignment of the this.currentUser object
//       const { username, password } = this.currentUser
  
//       // programmatically log us in without needing the UI
//       cy.request('POST', '/login', {
//         username,
//         password
//       })
  
//       // now that we're logged in, we can visit
//       // any kind of restricted route!
//       cy.visit('/dashboard')
  
//       // our auth cookie should be present
//       cy.getCookie('your-session-cookie').should('exist')
  
//       // UI should reflect this user being logged in
//       cy.get('h1').should('contain', 'jane.lane')
//     })
//   }) 

describe("Demo za .request", () => {
  it("Test response-a", () => {
    cy.request('https://jsonplaceholder.cypress.io/comments').should((response) => {
      console.log(response); 
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length(500)
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })
  })

  it("Cuvanje odgovora", () => {
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body.0')  // uzimamo prvi element
      .as('user')     // cuvamo objekat u okviru testa
      .then(function () {  // da bismo pristupili sacuvanom objektu koristimo "function () { ... }" callback 
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: this.user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.',
        }).its('body').as('post') // cuvamo kreirani post
      })
      .then(function () {
        console.log(this.post)
        // kada se pokrene callback .request komande su se izvrsile i mozemo da pristupimo user-u i post-u
        expect(this.post, 'post has the right user id').property('userId').to.equal(this.user.id)
      })
  })
})