describe('Add Room', () => {
  
    //Add new Room
    it('Add Room', () => {
      cy.visit('http://localhost:3000/')
      cy.get(':nth-child(2) > .nav-link').click() //click login button in home
      cy.get('[placeholder="email"]').type("gayathri@gmail.com")
      cy.get('[placeholder="password"]').type("poo@SMC123")
      cy.get('.btn').click() // click login

      cy.get('#doropdownMenuButton').click()
      cy.get('[href="/admin"]').click()
      cy.get('#rc-tabs-1-tab-3').click()

      cy.get(':nth-child(1) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("SQA ROOM")
      cy.get(':nth-child(1) > .ant-form > :nth-child(2) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("8000")
      cy.get(':nth-child(1) > .ant-form > :nth-child(3) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("4")
      cy.get(':nth-child(1) > .ant-form > :nth-child(4) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("0771234567")
      cy.get(':nth-child(5) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("This is a test room creation for academic project")
      cy.get(':nth-child(2) > .ant-radio > .ant-radio-inner').click()
      cy.get(':nth-child(2) > .ant-form > :nth-child(2) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("https://visitcentralalberta.com/wp-content/uploads/2017/05/8523_Best-Western-Red-Deer.jpg")
      cy.get(':nth-child(2) > .ant-form > :nth-child(3) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("https://tse3.mm.bing.net/th/id/OIP._XuZby4A43FdQhGGOy_avwHaEK?rs=1&pid=ImgDetMain")
      cy.get(':nth-child(2) > .ant-form > :nth-child(4) > .ant-row > .ant-col-17 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type("https://media.iceportal.com/101477/photos/70089007_XXL.jpg")
      
      cy.get('.ant-btn').click() //click add romm button

      cy.get('.swal2-confirm').click() //click ok
    })
  })
  