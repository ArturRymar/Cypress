import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://qauto2.forstudy.space/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
  },
   env: {
    loginEmail: "arturauto2@gmail.com",
    loginPassword: "Qwerty25"
  }
});