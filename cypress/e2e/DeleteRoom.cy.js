describe('Register', () => {
  
    // login
    it('Delete Room and check navigation', () => {
      cy.visit('http://localhost:3000/')
  
      cy.get(':nth-child(2) > .nav-link').click() //click login button in home
  
      cy.get('[placeholder="email"]').type("gayathri@gmail.com")
  
      cy.get('[placeholder="password"]').type("poo@SMC123")
      
      cy.get('.btn').click() // click login

      cy.get('#doropdownMenuButton').click() //click dropdown

      cy.get('[href="/admin"]').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('#rc-tabs-1-tab-4').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('#rc-tabs-1-tab-2').click()

      cy.wait(1000); // wait 1 seconds

      cy.get(':nth-child(3) > :nth-child(7) > .ant-tag > b').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('.swal2-confirm').click()

      cy.wait(1000); // wait 1 seconds

      cy.get('.swal2-confirm').click()

    })
  
  })
  