import HomePage from './Page Objects/homePage';

describe('First test suite', () => {
  const homePage = new HomePage();
  before(() => {
    cy.visit('');
  });
  it('Get first element', () => {
    homePage.listElement('get').should('exist');
  });
});
