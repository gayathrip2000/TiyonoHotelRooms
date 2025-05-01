describe('Register', () => {
  
  it('verify register', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.active > .nav-link').click() // click register button in home
    cy.get('[placeholder="name"]').type("Shanuka")
    cy.get('[placeholder="email"]').type("shanukayasiru27@gmail.com")
    cy.get('[placeholder="password"]').type("Shanuka@123")
    cy.get('[placeholder="confirm password"]').type("Shanuka@123")
    cy.get('.btn').click() // Click register
    cy.url().should('include', 'http://localhost:3000/') // navigate home page
  })

  it('verify Login', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(2) > .nav-link').click() //click login button in home
    cy.get('[placeholder="email"]').type("shanukayasiru27@gmail.com")
    cy.get('[placeholder="password"]').type("Shanuka@123")
    cy.get('.btn').click() // click login
  })

})
