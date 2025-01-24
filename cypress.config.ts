const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'rhgvf5',
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
  },
});
