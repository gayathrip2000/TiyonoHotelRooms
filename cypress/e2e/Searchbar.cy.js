describe('Search Room', () => {
  
    it('Perform booking calculation', () => {
      cy.visit('http://localhost:3000/')
    
      cy.get(':nth-child(2) > .nav-link').click() // click login button in home

      cy.get('[placeholder="email"]').type("gayathri@gmail.com")

      cy.get('[placeholder="password"]').type("poo@SMC123")

      cy.get('.btn').click() // click login

      cy.get('.ant-picker-input-active > input').click().type("07-05-2025") // enter start date

      cy.get(':nth-child(3) > input').click().type("06-04-2025") // enter end date

      cy.get(':nth-child(3) > input').invoke('val').then((endDate) => {
        // Get the current date
        const currentDate = new Date();
        const formattedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
        const [day, month, year] = endDate.split('-');
        const enteredEndDate = new Date(year, month - 1, day); // Month is 0-indexed
  
        if (enteredEndDate < formattedCurrentDate) {
          throw new Error('End date cannot be in the past. Test case failed!');
        } else {
          cy.log('End date is valid');
        }

        cy.get('.col-md-5 > .form-control').type("quad hotel room Type")

       })
    })
})