export default class BaseUrl {
  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
  }
  navigate() {
    cy.visit(this.url, { auth: this.auth});
  }
}
