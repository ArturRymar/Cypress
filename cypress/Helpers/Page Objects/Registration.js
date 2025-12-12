import BaseElement from '../Elements/BaseElement';

export default class RegistrationModal {
  #baseElement = new BaseElement();

  get signUpModal() {
    return this.#baseElement.getElement('.modal-content');
  }
  get modalTitle() {
    return this.#baseElement.getElement('.modal-title');
  }
  get closeModalIcon() {
    return this.#baseElement.getElement('.close');
  }
  get invalidFeedbackBlock() {
    return this.#baseElement.getElement('.invalid-feedback');
  }
  get signupName() {
    return this.#baseElement.getElement('#signupName');
  }
  get signupLastName() {
    return this.#baseElement.getElement('#signupLastName');
  }
  get signupEmail() {
    return this.#baseElement.getElement('#signupEmail');
  }
  get signupPassword() {
    return this.#baseElement.getElement('#signupPassword');
  }
  get passwordConfirmation() {
    return this.#baseElement.getElement('#signupRepeatPassword');
  }
  get registrationButton() {
    return this.#baseElement.getElement('.modal-content .btn.btn-primary');
  }
  get closeModalIcon() {
    return this.#baseElement.getElement('.close');
  }
}
