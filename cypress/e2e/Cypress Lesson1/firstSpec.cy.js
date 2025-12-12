import HomePage from './Page Objects L1/homePage';

let homePageUrl = 'https://example.cypress.io';
let homePage = new HomePage(homePageUrl);

describe('First test suite', () => {
  before(() => {
    homePage.navigate();
  });
  it('Get first element', () => {
    homePage.listElement('get').should('exist');
  });
});
