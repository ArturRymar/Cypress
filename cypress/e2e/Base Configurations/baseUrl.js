export default class BaseUrl {
  constructor(url) {
    this.url = url;
  }
  navigate() {
    cy.visit(this.url);
  }
}
