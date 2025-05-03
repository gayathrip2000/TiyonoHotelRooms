import users from '../fixtures/users';

describe('Register and Login', () => {
  users.forEach((user) => {
    let registrationFailed = false;

    it(`Verify registration for ${user.name}`, () => {
      cy.visit('http://localhost:3000/');

      cy.get('.active > .nav-link').click(); // click register button

      cy.get('[placeholder="name"]').type(user.name);
      cy.get('[placeholder="email"]').type(user.email);
      cy.get('[placeholder="password"]').type(user.password);
      cy.get('[placeholder="confirm password"]').type(user.confirmpassword);

      cy.get('.btn').click(); // click register

      cy.wait(1000); // wait for the popup

      if (user.password !== user.confirmpassword) {
        registrationFailed = true;

        cy.get('.swal2-popup').should('be.visible').within(() => {
          cy.get('.swal2-confirm').click();
        });

        cy.wrap(null).should(() => {
          throw new Error(`Password mismatch for user: ${user.name} — Registration failed as expected.`);
        });
      } else {
        cy.url().should('include', 'http://localhost:3000/');
      }
    });

    it(`Verify login for ${user.name}`, () => {
      cy.visit('http://localhost:3000/');

      cy.get(':nth-child(2) > .nav-link').click(); // click login button

      cy.get('[placeholder="email"]').type(user.email);
      cy.get('[placeholder="password"]').type(user.password);
      cy.get('.btn').click(); // click login

      cy.wait(1000);

      if (registrationFailed) {
        throw new Error(`No registered user: ${user.name} — Login failed as expected.`);
      } else {
        cy.url().should('include', 'http://localhost:3000/'); // adjust based on app routing
      }
    });
  });
});
