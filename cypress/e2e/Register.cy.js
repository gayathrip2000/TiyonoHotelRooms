import users from '../fixtures/users';

describe('Register', () => {

  users.forEach((user) => {
    it(`verify registration for ${user.name}`, () => {
      cy.visit('http://localhost:3000/')

      cy.get('.active > .nav-link').click() // click register button in home

      cy.get('[placeholder="name"]').type(user.name)

      cy.get('[placeholder="email"]').type(user.email)

      cy.get('[placeholder="password"]').type(user.password)

      cy.get('[placeholder="confirm password"]').type(user.password)

      cy.get('.btn').click() // Click register

      cy.url().should('include', 'http://localhost:3000/') // navigate home page
    })
    
    // login
    it('verify Login', () => {
      cy.visit('http://localhost:3000/')
      
      cy.get(':nth-child(2) > .nav-link').click() //click login button in home
      
      cy.get('[placeholder="email"]').type(user.email)
      
      cy.get('[placeholder="password"]').type(user.password)
      
      cy.get('.btn').click() // click login
    })
  })
})
