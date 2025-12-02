import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://example.cypress.io',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
