describe('Search Room', () => {
  
    it('Perform booking calculation', () => {
      cy.visit('http://localhost:3000/')
    
      cy.get(':nth-child(2) > .nav-link').click() // click login button in home

      cy.get('[placeholder="email"]').type("gayathri@gmail.com")

      cy.get('[placeholder="password"]').type("poo@SMC123")

      cy.get('.btn').click() // click login

      cy.get('.ant-picker-input-active > input').click().type("07-05-2025") // enter start date

      cy.get(':nth-child(3) > input').click().type("06-05-2025") // enter end date

      cy.get('.col-md-5 > .form-control').type("quad hotel room Type")

    })
})