/// <reference types="cypress" />

module.exports = class Registration {

    //*************************************************************Required fields*************************************************************************


    elements = {
        firstName: () => cy.get('#FirstName'),
        lastName: () => cy.get('#LastName'),
        email: () => cy.get('#Email'),
        password: () => cy.get('#Password'),
        confirmPassword: () => cy.get('#ConfirmPassword'),
        registerButton: () => cy.get('#register-button')
    }

    typeFirstName(value) {
        this.elements.firstName().clear().type(value, { log: false }).should('have.value', 'Veselin')
    }

    typeLastName(value) {
        this.elements.lastName().clear().type(value, { log: false }).should('have.value', 'Micunovic')
    }

    typeEmail(value) {
        this.elements.email().clear().type(value, { log: false })
    }

    typePassword(value) {
        this.elements.password().clear().type(value, { log: false }).should('have.value', 'Test2003')
    }

    typeConfirmPassword(value) {
        this.elements.confirmPassword().clear().type(value, { log: false }).should('have.value', 'Test2003')
    }

    clickRegisterButton() {
        this.elements.registerButton().click()
    }


    //****************************************************Optional fields, radio buttons, and select menus*****************************************************************


    selectGender() {
        cy.get('#gender-male').check().should('be.checked')

    }

    dateOfBirthDay() {
        cy.get('[name="DateOfBirthDay"]').select('13').should('have.value', '13')

    }

    dateOfBirthMonth() {
        cy.get('[name="DateOfBirthMonth"]').select('veljača').should('have.value', '2')

    }

    dateOfBirthYear() {
        cy.get('[name="DateOfBirthYear"]').select('1986').should('have.value', '1986')

    }
    streetAddress() {
        cy.get('#StreetAddress').type('Gavrila Principa 100').should('include.value', 'Gavrila Principa 100')

    }

    zipCode() {

        cy.get('.ui-autocomplete-input').eq(3).type('21000')
        cy.get('.ui-menu-item').each(($el, index, $list) => {

            if ($el.text() === "21000 KAMEN, Croatia") {
                $el.click()
            }
        })
    }

    city() {
        cy.get('.ui-autocomplete-input').eq(4).should('have.value', 'KAMEN')
    }

    country() {
        cy.get('#CountryId_dropdown').should('have.value', '24')
    }

    phoneNumber() {
        cy.get('#Phone').type('0603434021')
    }

    newsletter() {
        cy.get('#Newsletter').check().should('be.checked')
    }

    linkToMainPage() {
        cy.contains('www.links.hr').click()
    }

    registrationButton() {
        cy.get('.user-registration').click()
    }


    //****************************************************Text verification*****************************************************************

    registerHeaderConfirmation() {
        cy.get('h1').should('include.text', 'Registrirajte se')
    }

    successfullySentEmailMessage() {
        cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
    }

    accountSuccessfullyActivatedMessage() {
        cy.get('.result').should('include.text', ' Vaš račun je aktiviran')
    }

}