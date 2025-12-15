import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://qauto.forstudy.space/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
  },
  env: {
    loginEmail: "arturauto@gmail.com",
    loginPassword: "Qwerty25"
  }
});