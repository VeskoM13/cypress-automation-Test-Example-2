/// <reference types="cypress" />

import Base from "../pages/Base";
import Registration from "../pages/RegistrationPage";
import RegistrationAsCompany from "../pages/RegistrationAsCompany"

describe('Testing company registration flow', function () {
    const serverId = 'lmcquo6e'
    const serverDomain = 'lmcquo6e.mailosaur.net'
    const number = Math.floor(Math.random() * 101)
    const emailAddress = 'account-second' + number + '@' + serverDomain

    const base = new Base
    const registration = new Registration
    const company = new RegistrationAsCompany


    let confirmationLink

    beforeEach(function () {
        cy.fixture('registrationData.json').as('Data')
        cy.restoreLocalStorage()

    })

    afterEach(() => {
        cy.getCookies().then(cookies => {
            const namesOfCookies = cookies.map(c => c.name)
            Cypress.Cookies.preserveOnce(...namesOfCookies)
        })
        cy.saveLocalStorage()

    })

    it('Open Links app - registration page', function () {
        base.openLinksApp()
    })

    it("Registration as Company flow", function () {
        company.registerAsCompanyButton()
        company.companyName()
        company.companyOIB()
        company.companyEmail()
        company.companyphone()
        company.contactPerson()
        company.companyAddress()
        company.zipCodeCompany()
        company.cityCompany()
        company.countryCompany()
    })

    it("Register customer flow", function () {
        registration.registerHeaderConfirmation()
        registration.selectGender()
        registration.typeFirstName(this.Data.firstName)
        registration.typeLastName(this.Data.lastName)
        registration.dateOfBirthDay()
        registration.dateOfBirthMonth()
        registration.dateOfBirthYear()
        registration.typeEmail(emailAddress)
        registration.streetAddress()
        registration.phoneNumber()
        registration.newsletter()
        registration.typePassword(this.Data.password)
        registration.typeConfirmPassword(this.Data.password)
        registration.zipCode()
        registration.city()
        registration.country()
        registration.typePassword(this.Data.password)
        registration.typeConfirmPassword(this.Data.password)
        registration.clickRegisterButton()
        registration.successfullySentEmailMessage()
        cy.wait(15000)
    })


    it('Gets Account Activation email from Mailosaur', () => {
        cy.mailosaurGetMessage(serverId, {
            sentTo: emailAddress
        }).then(email => {
            Cypress.env('confirmationLink', email.html.links[1].href)
            cy.visit(Cypress.env('confirmationLink'))
            registration.accountSuccessfullyActivatedMessage()
            cy.wait(15000)
            cy.mailosaurGetMessage(serverId, {
                sentTo: emailAddress,
            }).then((email) => {
                expect(email.subject).to.equal('Hvala na prijavi!')
                cy.wait(60000)
                cy.mailosaurGetMessage(serverId, {
                    sentTo: emailAddress,
                }).then((email) => {
                    expect(email.subject).to.equal('Dobro došli u Links.')
                })
            })
        })
    })
})