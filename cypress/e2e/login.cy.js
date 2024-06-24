import loginPage from "../support/pageObject/loginPOM"

describe('Login ', () => {
    beforeEach(() => {

      cy.visit('https://www.saucedemo.com')
      
    })

    it('Login Success',() => {  
      //cy.get('[data-test="username"]').type('standard_user')
      cy.get(loginPage.Username).type('standard_user')
      cy.get(loginPage.psw).type('secret_sauce')
      cy.get(loginPage.btn_login).click()
      cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
    })

    it('Login locked_out_user', () => {
      cy.get(loginPage.Username).type('locked_out_user')
      cy.get(loginPage.psw).type('secret_sauce')
      cy.get(loginPage.btn_login).click()
      cy.get('[data-test="error"]').should('contain.text','Epic sadface: Sorry, this user has been locked out.')
    })

    it('Login Empty Username', () => {
      cy.get(loginPage.psw).type('secret_sauce')
      cy.get(loginPage.btn_login).click()
      cy.get('[data-test="error"]').should('contain.text','Epic sadface: Username is required')
    })

    it('Login Empty Username', () => {
      cy.get(loginPage.Username).type('standard_user')
      cy.get(loginPage.btn_login).click()
      cy.get('[data-test="error"]').should('contain.text','Epic sadface: Password is required')
    })

    it('Login Empty Username', () => {
      cy.get(loginPage.Username).type(' ')
      cy.get(loginPage.psw).type(' ')
      cy.get(loginPage.btn_login).click()
      cy.get('[data-test="error"]').should('contain.text','Epic sadface: Username and password do not match any user in this service')
    })

})
