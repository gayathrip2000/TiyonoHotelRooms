describe('Search Room', () => {
  
    it('Perform booking calculation', () => {
      cy.visit('http://localhost:3000/')
    
      cy.get(':nth-child(2) > .nav-link').click() // click login button in home
      cy.get('[placeholder="email"]').type("gayathri@gmail.com")
      cy.get('[placeholder="password"]').type("poo@SMC123")
      cy.get('.btn').click() // click login
  
      cy.get('.ant-picker-input-active > input').click().type("07-05-2025") // enter start date
      cy.get(':nth-child(3) > input').click().type("09-05-2025") // enter end date
      cy.get('.col-md-5 > .form-control').click()
  
      cy.get(':nth-child(1) > .row > .col-md-7 > div > a > .btn').click() // click book now button
  
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
      
      cy.on('window:alert', function(alert){
        cy.window().then(($win)=>{
          cy.stub($win, 'prompt').returns("pop up")
        })
      })
      cy.get('span > .btn').click()
    });
  });
  