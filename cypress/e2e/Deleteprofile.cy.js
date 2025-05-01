describe('Register', () => {
  
    //register
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
  
    // login
    it('Delete Profile', () => {
      cy.visit('http://localhost:3000/')
  
      cy.get(':nth-child(2) > .nav-link').click() //click login button in home
  
      cy.get('[placeholder="email"]').type("shanukayasiru27@gmail.com")
  
      cy.get('[placeholder="password"]').type("Shanuka@123")
      
      cy.get('.btn').click() // click login

      cy.get('#doropdownMenuButton').click() //click dropdown

      cy.get('[href="/profile"]').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('.bs > div > .btn').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('.swal2-confirm').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('.swal2-confirm').click()

    })
  
  })
  