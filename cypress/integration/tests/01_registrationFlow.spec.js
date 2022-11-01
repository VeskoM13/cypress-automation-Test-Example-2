/// <reference types="cypress" />

import Base from "../pages/Base";
import Registration from "../pages/RegistrationPage";

describe('Testing registration flow', function () {
    const serverId = 'lmcquo6e'
    const serverDomain = 'lmcquo6e.mailosaur.net'
    const number = Math.floor(Math.random() * 101)
    const emailAddress = 'account-first' + number + '@' + serverDomain

    const base = new Base
    const registration = new Registration

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

    it('Registration flow', function () {
        registration.registerHeaderConfirmation()
        registration.selectGender()
        registration.typeFirstName(this.Data.firstName)
        registration.typeLastName(this.Data.lastName)
        registration.dateOfBirthDay()
        registration.dateOfBirthMonth()
        registration.dateOfBirthYear()
        registration.typeEmail(emailAddress)
        registration.streetAddress()
        registration.zipCode()
        registration.city()
        registration.country()
        registration.phoneNumber()
        registration.newsletter()
        registration.typePassword(this.Data.password)
        registration.typeConfirmPassword(this.Data.password)
        registration.clickRegisterButton()
        registration.successfullySentEmailMessage()
        cy.wait(15000)

    })

    it.skip('Gets Account Activation email from Mailosaur', () => {
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