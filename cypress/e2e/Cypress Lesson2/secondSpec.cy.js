import HomePage from './Page Objects L2/homePage L2';

let homePageUrl = 'https://qauto.forstudy.space/';
let authentication = {
  username: 'guest',
  password: 'welcome2qauto',
};
let homePage = new HomePage(homePageUrl, authentication);

describe('First test suite', () => {
  beforeEach(() => {
    homePage.navigate();
  });
  it('Registration modal can be opened and closed', () => {
    homePage.signUpButton.click();
    homePage.modalTitle.should('have.text', 'Registration');
    homePage.closeModalIcon.click();
  });
  it('Ithillel homepage is opened from footer', () => {
    homePage.contactsLink;
    homePage.removeAttribute(homePage.contactsLink, 'target').click();
    cy.url().should('eq', 'https://ithillel.ua/');
  });
});
