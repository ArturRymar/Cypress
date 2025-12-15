import BaseElement from '../../Elements/BaseElement';

export default class GaragePage {
  #baseElement = new BaseElement();

  get openAddCarModalButton() {
    return this.#baseElement.getElement('.panel-page .btn.btn-primary');
  }
  get addCarModalHeader() {
    return this.#baseElement.getElement('app-add-car-modal .modal-header');
  }
  get carMileage() {
    return this.#baseElement.getElement('#addCarMileage');
  }
  get invalidFeedbackBlock() {
    return this.#baseElement.getElement('.invalid-feedback');
  }
  get carBrand() {
    return this.#baseElement.getElement('#addCarBrand');
  }
  carBrandOption(optionValue) {
    return this.#baseElement.getElement(
      `#addCarBrand option[value='${optionValue}']`
    );
  }
  get carModel() {
    return this.#baseElement.getElement('#addCarModel');
  }
  carModelOption(optionValue) {
    return this.#baseElement.getElement(
      `#addCarModel option[value='${optionValue}']`
    );
  }
  get addCarButton() {
    return this.#baseElement.getElement('.modal-content .btn.btn-primary');
  }
  get carEditPage() {
    return this.#baseElement.getElement('.car_actions .car_edit.btn-edit').first();
  }
  get carEditMileage() {
    return this.#baseElement.getElement('app-edit-car-modal #addCarMileage');
  }
  get carEditCreationDate() {
    return this.#baseElement.getElement('app-edit-car-modal #carCreationDate');
  }
  get carEditCarModel() {
    return this.#baseElement.getElement('app-edit-car-modal #addCarModel');
  }
  get carEditCarBrand() {
    return this.#baseElement.getElement('app-edit-car-modal #addCarBrand');
  }
  
}
