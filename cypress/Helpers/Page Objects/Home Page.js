import BaseUrl from '../Base Configurations/baseUrl';
import BaseElement from '../Elements/BaseElement';

export default class HomePage extends BaseUrl {
  #baseElement = new BaseElement();
  constructor(url, auth) {
    super(url, auth);
  }
  get signUpButton() {
    return this.#baseElement.getElement('.hero-descriptor_btn');
  }
  get signInButton() {
    return this.#baseElement.getElement('.header_signin');
  }
  get loginModal() {
    return this.#baseElement.getElement('app-signin-modal');
  }
  get loginEmail() {
    return this.#baseElement.getElement('#signinEmail');
  }
  get loginPassword() {
    return this.#baseElement.getElement('#signinPassword');
  }
  get loginButton() {
    return this.#baseElement.getElement('app-signin-modal .btn.btn-primary');
  }
  get logoutButton() {
    return this.#baseElement.getElement('.text-danger.btn-sidebar.sidebar_btn');
  }

  userLogin(email, password) {
    this.loginEmail.type(email);
    this.loginEmail.should('have.value', email);
    this.loginPassword.type(password);
    this.loginPassword.should('have.value', password);
    this.loginButton.click();
    cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
  }
}
