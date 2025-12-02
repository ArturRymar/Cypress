export default class HomePage {
  get list() {
    return cy.get('.home-list');
  }
  listElement(elementText) {
    return this.list.contains(elementText);
  }
}
