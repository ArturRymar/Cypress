import BaseUrl from '../../Base Configurations/baseUrl';

export default class HomePage extends BaseUrl {
  constructor(url) {
    super(url);
  }
  get list() {
    return cy.get('.home-list');
  }
  listElement(elementText) {
    return this.list.contains(elementText);
  }
}
