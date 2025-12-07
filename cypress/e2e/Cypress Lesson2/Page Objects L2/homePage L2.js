import BaseUrl from '../baseUrl L2';

export default class HomePage extends BaseUrl {
  constructor(url, auth) {
    super(url, auth);
  }
  get signUpButton() {
    return cy.get('.hero-descriptor_btn');
  }
  get modalTitle() {
    return cy.get('.modal-title');
  }
  get closeModalIcon() {
    return cy.get('.close');
  }
  get contactsLink () {
    return cy.get(".contacts_link.display-4");
  }
  removeAttribute (element, attributeTitle) {
  return element.invoke("removeAttr", attributeTitle);
}
}
