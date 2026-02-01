FROM cypress/included:15.7.1
WORKDIR /e2e

COPY package*.json ./
RUN npm install

COPY . ./
CMD [ "npx", "cypress", "run", "--browser", "firefox", "--spec", "cypress/e2e/lesson22Spec.cy.js", "--config-file", "cypress.qauto.config.js" ]