const testCases = require('../fixtures/Searchbar');

describe('Search Room', () => {
  testCases.forEach(({ startDate, endDate, roomType }) => {
    it(`Performs booking calculation for ${roomType} from ${startDate} to ${endDate}`, () => {
      cy.visit('http://localhost:3000/');

      cy.get(':nth-child(2) > .nav-link').click(); // click login button in home
      cy.get('[placeholder="email"]').type("gayathri@gmail.com");
      cy.get('[placeholder="password"]').type("poo@SMC123");
      cy.get('.btn').click(); // click login

      cy.get('.ant-picker-input-active > input').click().type(startDate); // enter start date
      cy.get(':nth-child(3) > input').click().type(endDate); // enter end date

      cy.get(':nth-child(3) > input').invoke('val').then((endDateVal) => {
        const currentDate = new Date();
        const formattedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        const [day, month, year] = endDateVal.split('-');
        const enteredEndDate = new Date(year, month - 1, day);

        if (enteredEndDate < formattedCurrentDate) {
          throw new Error('End date cannot be in the past. Test case failed!');
        } else {
          cy.log('End date is valid');
        }

        cy.get('.col-md-5 > .form-control').clear().type(roomType); // type room name

        cy.wait(1000); 
      });
    });
  });
});
