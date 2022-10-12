/// <reference types="cypress" />

module.exports = class RegistrationAsCompany {

    registerAsCompanyButton() {
        cy.get('#RegisterAsCompany').check().should('be.checked')
    }

    companyName() {
        cy.get('#Company').type("Subnet Mask").should('have.value', 'Subnet Mask')
    }

    companyOIB() {
        cy.get('#CompanyOIB').type("58287005100").should('have.value', '58287005100')
    }

    companyEmail() {
        cy.get('#CompanyEmail').type("testvesko13@gmail.com").should('have.value', 'testvesko13@gmail.com')
    }

    companyphone() {
        cy.get('#CompanyTelephone').type("0603434022").should('have.value', '0603434022')
    }

    contactPerson() {
        cy.get('#CompanyContactPerson').type("Veselin Micunovic").should('have.value', 'Veselin Micunovic')
    }

    companyAddress() {
        cy.get('#CompanyAddress').type("Gavrila Pricipa 5").should('have.value', 'Gavrila Pricipa 5')
    }

    zipCodeCompany() {

        cy.get('.ui-autocomplete-input').eq(1).type('21000')
        cy.get('.ui-menu-item').each(($el, index, $list) => {

            if ($el.text() === "21000 KAMEN, Croatia") {
                $el.click()
            }
        })
    }

    cityCompany() {
        cy.get('.ui-autocomplete-input').eq(2).should('have.value', 'KAMEN')
    }

    countryCompany() {
        cy.get('#CompanyCountryId_dropdown').should('have.value', '24')
    }
}