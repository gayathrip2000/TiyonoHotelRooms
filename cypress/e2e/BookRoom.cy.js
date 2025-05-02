import dateRanges from '../fixtures/BookRoom';

describe('Search Room', () => {
  dateRanges.forEach((dates) => {
    it(`Perform booking calculation for dates: ${dates.startDate} to ${dates.endDate}`, () => {
      cy.visit('http://localhost:3000/')
      cy.get(':nth-child(2) > .nav-link').click() // click login button in home
      cy.get('[placeholder="email"]').type("gayathri@gmail.com")
      cy.get('[placeholder="password"]').type("poo@SMC123")
      cy.get('.btn').click() // click login

      cy.wait(1000); 

      // Set start date and end date
      cy.get('.ant-picker-input-active > input').click().type(dates.startDate) 
      cy.wait(1000); 
      cy.get(':nth-child(3) > input').click().type(dates.endDate) 
      cy.get('.col-md-5 > .form-control').click()

      cy.wait(1000); 

      cy.get(':nth-child(1) > .row > .col-md-7 > div > a > .btn').click() // click book now button

      // Verify booking details and total amount calculation
      cy.get(':nth-child(2) > b > :nth-child(3)').invoke('text').should('not.be.empty').then((text) => {
        cy.log('Raw Total Days Text: ' + text);
        const totalDays = parseInt(text.replace(/\D/g, '').trim(), 10);
        cy.log('Total Days: ' + totalDays);

        cy.get(':nth-child(2) > b > :nth-child(4)').invoke('text').should('not.be.empty').then((text) => {
          const rentPerDay = parseInt(text.replace(/\D/g, '').trim(), 10); // Remove non-numeric characters
          cy.log('Rent per Day: ' + rentPerDay);

          cy.get(':nth-child(2) > b > :nth-child(5)').invoke('text').should('not.be.empty').then((text) => {
            const totalAmount = parseInt(text.replace(/\D/g, '').trim(), 10); // Remove non-numeric characters
            cy.log('Total Amount: ' + totalAmount); 

            const calculatedTotalAmount = totalDays * rentPerDay;
            cy.log('Calculated Total Amount: ' + calculatedTotalAmount);

            expect(calculatedTotalAmount).to.equal(totalAmount);
          });
        });
      });

      cy.wait(1000); // wait 1 second

      // Confirm booking
      cy.get('[style="float: right;"] > .btn').click()
      cy.wait(1000); // wait 1 second
      
      cy.get('.swal2-confirm').click() // click sweet alert yes button
      cy.wait(1000); // wait 1 second

      cy.get('.swal2-confirm').click() // click ok
    });
  });
});

