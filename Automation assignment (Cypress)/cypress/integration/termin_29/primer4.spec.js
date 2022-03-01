describe('Hooks', () => {
  before(() => {
    // runs once before all tests in the block
    cy.log('*************** SETUP ***************')
  })

  after(() => {
    // runs once after all tests in the block
    cy.log('*************** TEAR DOWN ***************')
  })

  beforeEach(() => {
    // runs before each test in the block
    cy.log('*************** LOGIN ***************')
  })

  afterEach(() => {
    // runs after each test in the block
    cy.log('*************** LOGOUT ***************')
  })

  it('Add Customer Test', () => {
    cy.log('*************** ADD CUSTOMER ***************')
  })
  it('Edit Customer Test', () => {
    cy.log('*************** EDIT CUSTOMER ***************')
  })
  it('Delete Customer Test', () => {
    cy.log('*************** DELETE CUSTOMER ***************')
  })
})

/*
1. before()
2. beforeEach()
3. tests
4. afterEach()
5. after()
 */