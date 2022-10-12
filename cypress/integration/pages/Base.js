/// <reference types="cypress" />

module.exports = class Base {

     openLinksApp() {
          cy.visit('https://www.links.hr/hr/register')

     }

     acceptCookies() {
          cy.get('#eu-cookie-ok').click()
     }

}