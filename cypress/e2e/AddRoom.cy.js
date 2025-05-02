import rooms from '../fixtures/AddRoom';

describe('Add Room', () => {
  
  rooms.forEach((room) => {
    it(`Add room: ${room.name}`, () => {
      cy.visit('http://localhost:3000/')
      cy.get(':nth-child(2) > .nav-link').click() // click login button in home
      cy.get('[placeholder="email"]').type("gayathri@gmail.com")
      cy.get('[placeholder="password"]').type("poo@SMC123")
      cy.get('.btn').click() // click login

      cy.get('#doropdownMenuButton').click()
      cy.get('[href="/admin"]').click()
      cy.get('#rc-tabs-1-tab-3').click()

      cy.get(':nth-child(1) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.name, { delay: 0 })
      cy.get(':nth-child(1) > .ant-form > :nth-child(2) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.price, { delay: 0 })
      cy.get(':nth-child(1) > .ant-form > :nth-child(3) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.capacity, { delay: 0 })
      cy.get(':nth-child(1) > .ant-form > :nth-child(4) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.phone, { delay: 0 })
      cy.get(':nth-child(5) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.description, { delay: 0 })
      
      cy.get(':nth-child(2) > .ant-radio > .ant-radio-inner').click() // Select the room type
      cy.get(':nth-child(2) > .ant-form > :nth-child(2) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.image1, { delay: 0 })
      cy.get(':nth-child(2) > .ant-form > :nth-child(3) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.image2, { delay: 0 })
      cy.get(':nth-child(2) > .ant-form > :nth-child(4) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(room.image3, { delay: 0 })

      cy.get('.ant-btn').click() // Click the 'Add Room' button
      
      cy.wait(1000); 

      cy.get('.swal2-confirm').click() // Click the SweetAlert confirmation button
    })
  })
})
