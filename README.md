## Frameworks

cypress
mocha

## Dependencies 
The dependencies are stored in package.json

## Cypress installation commands :

1. npm init -y
2. npm install --save-dev cypress
3. npm install --save-dev mocha
4. npm install --save-dev chai          // assertion
5. npm install --save-dev mochawesome   // reports   
6. npm i -D cypress-mailosaur           // emails

## Command to start test runner

7. npx cypress open 

note:
Testing in Electron browser is recommended 

## Project structure 

* Registartion Data are stored in cypress\fixtures\registrationData.json
* Tests are stored in cypress\integration\tests

## Command for creating HTML reports from all tests:

.\node_modules\.bin\cypress run --reporter mochawesome

## Command for creating HTML reports for specific tests:

                                                ## Copy the full path of the test
.\node_modules\.bin\cypress run --reporter mochawesome --spec C:\Users\Miodrag\TestCypresAutomation\cypress\integration\tests\01_registrationFlow.spec.js
.\node_modules\.bin\cypress run --reporter mochawesome --spec C:\Users\Miodrag\TestCypresAutomation\cypress\integration\tests\02_registrationAsCompany.spec.js


note:

- After the HTML report is generated, open the mochawesome-report folder, copy the path from the mochawesome.html report and copy it to the browser address bar

- The Mailosaur plugin is used to automate email testing and user account activation
  https://mailosaur.com/docs/frameworks-and-tools/cypress/
  
