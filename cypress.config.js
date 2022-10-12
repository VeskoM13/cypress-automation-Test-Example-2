const { defineConfig } = require("cypress");

module.exports = defineConfig({

  "viewportWidth": 1920,
  "viewportHeight": 1080,
  "defaultCommandTimeout": 100000,
  "requestTimeout": 100000,
  "reporter": 'mochawesome',

  env: {
    MAILOSAUR_API_KEY: "nA6wG4Mhy5CCWKZD",
  },
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/tests/*.js"
  },



});
