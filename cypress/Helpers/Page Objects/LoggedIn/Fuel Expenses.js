import BaseElement from '../../Elements/BaseElement';

export default class FuelExpensesPage {
  #baseElement = new BaseElement();

  get fuelExpPage() {
    return this.#baseElement.getElement('a[routerlink="expenses"]');
  }
  get openAddExpenseModalButton() {
    return this.#baseElement.getElement('app-fuel-expenses .btn.btn-primary ');
  }
  get addExpenseModalHeader() {
    return this.#baseElement.getElement('app-add-expense-modal .modal-header');
  }
  get carSelectDropdown() {
    return this.#baseElement.getElement('#carSelectDropdown');
  }
  get carSelectDropdownMenu() {
    return this.#baseElement.getElement('.car-select-dropdown_menu');
  }
  get carItem() {
    return this.#baseElement.getElement(
      '.car-select-dropdown_menu >li:nth-child(2)'
    );
  }
  get carExpenseVehicle() {
    return this.#baseElement.getElement('#addExpenseCar');
  }
  carExpenseVehicleOption(optionValue) {
    return this.#baseElement.getElement(
      `#addExpenseCar option[value='${optionValue}']`
    );
  }
  get expenseReportDate() {
    return this.#baseElement.getElement('#addExpenseDate');
  }
  get expenseMileage() {
    return this.#baseElement.getElement('#addExpenseMileage');
  }
  get expenseNumberOfLiters() {
    return this.#baseElement.getElement('#addExpenseLiters');
  }
  get expenseTotalCost() {
    return this.#baseElement.getElement('#addExpenseTotalCost');
  }
  get invalidFeedbackBlock() {
    return this.#baseElement.getElement('.invalid-feedback');
  }
  get addExpenseButton() {
    return this.#baseElement.getElement(
      'app-add-expense-modal .btn.btn-primary'
    );
  }
  get errorAlert() {
    return this.#baseElement.getElement('app-add-expense-modal .alert-danger');
  }
  get expensesTable() {
    return this.#baseElement.getElement('.expenses .expenses_table');
  }
  get expensesTableDateValue() {
    return this.#baseElement.getElement(".table.expenses_table tbody").first("tr:first-child");
  }
}
