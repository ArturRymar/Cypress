import HomePage from '../Helpers/Page Objects/Home Page';
import {
  homePageUrl,
  authentication,
} from '../Helpers/Base Configurations/data.json';
import GaragePage from '../Helpers/Page Objects/LoggedIn/Garage';
import FuelExpensesPage from '../Helpers/Page Objects/LoggedIn/Fuel Expenses';
import moment from 'moment/moment';

let homePage = new HomePage(homePageUrl, authentication);
let garagePage = new GaragePage();
let fuelExpensesPage = new FuelExpensesPage();

describe('Garage suite', () => {
  beforeEach(() => {
    homePage.navigate();
    homePage.signInButton.click();
    homePage.userLogin(Cypress.env('loginEmail'), Cypress.env('loginPassword'));
  });

  it('Add car modal is opened', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.addCarModalHeader.should('include.text', 'Add a car');
  });

  //Add Car - Mileage field
  it('Mileage field is required', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carMileage.clear();
    garagePage.addCarModalHeader.click();
    garagePage.invalidFeedbackBlock
      .contains('Mileage cost required')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Only numbers are acceptable for Mileage field', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carMileage.clear().type('a').should('have.value', '');
    garagePage.carMileage.clear().type('*').should('have.value', '');
  });

  it('Mileage can`t be less 0 and more 999999', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carMileage.clear().type('-1');
    garagePage.addCarModalHeader.click();
    garagePage.invalidFeedbackBlock
      .contains('Mileage has to be from 0 to 999999')
      .should('be.visible');
    garagePage.carMileage.clear().type('1000000');
    garagePage.addCarModalHeader.click();
    garagePage.invalidFeedbackBlock
      .contains('Mileage has to be from 0 to 999999')
      .should('be.visible');
  });

  it('Mileage can be added via keyboard`s up/downarrow', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carMileage.clear().type('{uparrow}').should('have.value', '1');
    garagePage.carMileage
      .clear()
      .type('{uparrow}{downarrow}')
      .should('have.value', '0');
  });

  it('Mileage is acceptable with valid data', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carMileage.clear().type('10').should('have.value', '10');
  });

  //Add car - Brand and Model fields
  it('Brand and Model are filled by default', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carBrandOption('0: 1').should('have.text', 'Audi');
    garagePage.carModelOption('0: 1').should('have.text', 'TT');
  });

  it('I can change default value for Brand and Model', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carBrandOption('0: 1').should('have.text', 'Audi');
    garagePage.carBrand
      .select('1: 2', { force: true })
      .should('have.value', '1: 2');

    garagePage.carModelOption('5: 6').should('exist');
    garagePage.carModel
      .select('6: 7', { force: true })
      .should('have.value', '6: 7');
  });

  //Add car - submit button
  it('Add button is disabled until adding Mileage', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carMileage.clear();
    garagePage.addCarModalHeader.click();
    garagePage.addCarButton.should('be.disabled');
  });

  ////Add car - car adding
  it('Car can be added with valid data', () => {
    garagePage.openAddCarModalButton.click();
    garagePage.carBrand
      .select('1: 2', { force: true })
      .should('have.value', '1: 2');
    garagePage.carModel
      .select('6: 7', { force: true })
      .should('have.value', '6: 7');
    garagePage.carMileage.clear().type('10');
    garagePage.addCarButton.click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}panel/garage`);
    garagePage.carEditPage.click();

    // Code in case I want to entered data into variables

    // garagePage.carEditMileage.invoke('val').then((value) => {
    //   addedCar.mileage = Number(value);
    // });
    // garagePage.carEditCreationDate.invoke('val').then((value) => {
    //   addedCar.creationDate = value;
    // });
    // garagePage.carEditCarBrand
    //   .find('option:selected')
    //   .invoke('text')
    //   .then((text) => {
    //     addedCar.brand = text;
    //   });
    // garagePage.carEditCarModel
    //   .find('option:selected')
    //   .invoke('text')
    //   .then((text) => {
    //     addedCar.model = text;
    //   });
  });
});

describe('Fuel expenses suite', () => {
  beforeEach(() => {
    homePage.navigate();
    homePage.signInButton.click();
    homePage.userLogin(Cypress.env('loginEmail'), Cypress.env('loginPassword'));
    fuelExpensesPage.fuelExpPage.click();
  });

  it('Add fuel expenses modal is opened', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.addExpenseModalHeader.should(
      'include.text',
      'Add an expense'
    );
  });

  //Add fuel expenses - Report Date field
  it('Reports Date is required', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage.clear().type('10');
    fuelExpensesPage.expenseNumberOfLiters.clear().type('10');
    fuelExpensesPage.expenseTotalCost.clear().type('10');
    fuelExpensesPage.expenseReportDate.clear();
    fuelExpensesPage.addExpenseButton.should('be.disabled');
  });

  it('Reports Date can be changed', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseReportDate
      .clear()
      .type('12.12.2025')
      .should('have.value', '12.12.2025');
  });

  it('Reports Date is filled as today`s date', () => {
    let todayDate = moment().format('DD.MM.YYYY');
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseReportDate.should('have.value', `${todayDate}`);
  });

  it('Report date can`t be before today`s date', () => {
    let yesterdayDate = moment().subtract(1, 'days').format('DD.MM.YYYY');
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseReportDate.clear().type(`${yesterdayDate}`);
    fuelExpensesPage.expenseMileage.clear().type('10');
    fuelExpensesPage.expenseNumberOfLiters.clear().type('10');
    fuelExpensesPage.expenseTotalCost.clear().type('10');
    fuelExpensesPage.addExpenseButton.click();
    fuelExpensesPage.errorAlert
      .contains('New expense date must not be less than car creation date.')
      .should('be.visible');
  });

  it('Report date can`t be after today`s date', () => {
    let tomorrowDate = moment().add(1, 'days').format('DD.MM.YYYY');
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseReportDate.clear().type(`${tomorrowDate}`);
    fuelExpensesPage.expenseMileage.clear().type('10');
    fuelExpensesPage.expenseNumberOfLiters.clear().type('10');
    fuelExpensesPage.expenseTotalCost.clear().type('10');
    fuelExpensesPage.addExpenseButton.click();
    fuelExpensesPage.errorAlert
      .contains('Report date has to be less than tomorrow')
      .should('be.visible');
  });

  //Add fuel expenses - Mileage filed
  it('Mileage field is required', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage.clear();
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Mileage required')
      .should('be.visible');
  });

  it('Only numbers are asseptable for Mileage', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage.clear().type('a').should('have.value', '');
    fuelExpensesPage.expenseMileage.clear().type('*').should('have.value', '');
  });

  it('Mileage can`t be less 0 and more 999999', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage.clear().type('-1');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Mileage has to be from 0 to 999999')
      .should('be.visible');
    fuelExpensesPage.expenseMileage.clear().type('1000000');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Mileage has to be from 0 to 999999')
      .should('be.visible');
  });

  it('Mileage can be added via keyboard`s up/downarrow', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage
      .clear()
      .type('{uparrow}')
      .should('have.value', '1');
    fuelExpensesPage.expenseMileage
      .clear()
      .type('{uparrow}{downarrow}')
      .should('have.value', '0');
  });

  it('Mileage is acceptable with valid data', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage
      .clear()
      .type('10')
      .should('have.value', '10');
  });

  //Add fuel expenses - Number of liters field
  it('Number of liters is required', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseNumberOfLiters.clear();
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Liters required')
      .should('be.visible');
  });

  it('Only numbers are asseptable for Number of liters', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseNumberOfLiters
      .clear()
      .type('a')
      .should('have.value', '');
    fuelExpensesPage.expenseNumberOfLiters
      .clear()
      .type('*')
      .should('have.value', '');
  });

  it('Number of liters can`t be less 0, 0 and more 999999', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseNumberOfLiters.clear().type('-1');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Liters has to be from 0.01 to 9999')
      .should('be.visible');

    fuelExpensesPage.expenseNumberOfLiters.clear().type('1000000');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Liters has to be from 0.01 to 9999')
      .should('be.visible');

    fuelExpensesPage.expenseNumberOfLiters.clear().type('0');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Liters has to be from 0.01 to 9999')
      .should('be.visible');
  });

  it('Number of liters can be added via keyboard`s up/downarrow', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseNumberOfLiters
      .clear()
      .type('{uparrow}')
      .should('have.value', '1');
    fuelExpensesPage.expenseNumberOfLiters
      .clear()
      .type('{uparrow}{downarrow}{uparrow}')
      .should('have.value', '1');
  });

  it('Number of liters is acceptable with valid data', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseNumberOfLiters
      .clear()
      .type('10')
      .should('have.value', '10');
  });

  // Add fuel expenses - Total cost field
  it('Total cost is required', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseTotalCost.clear();
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Total cost required')
      .should('be.visible');
  });

  it('Only numbers are asseptable for Total cost', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseTotalCost
      .clear()
      .type('a')
      .should('have.value', '');
    fuelExpensesPage.expenseTotalCost
      .clear()
      .type('*')
      .should('have.value', '');
  });

  it('Total cost can`t be less 0, 0 and more 999999', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseTotalCost.clear().type('-1');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Total cost has to be from 0.01 to 1000000')
      .should('be.visible');

    fuelExpensesPage.expenseTotalCost.clear().type('1000001');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Total cost has to be from 0.01 to 1000000')
      .should('be.visible');

    fuelExpensesPage.expenseTotalCost.clear().type('0');
    fuelExpensesPage.addExpenseModalHeader.click();
    fuelExpensesPage.invalidFeedbackBlock
      .contains('Total cost has to be from 0.01 to 1000000')
      .should('be.visible');
  });

  it('Total cost can be added via keyboard`s up/downarrow', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseTotalCost
      .clear()
      .type('{uparrow}')
      .should('have.value', '1');
    fuelExpensesPage.expenseTotalCost
      .clear()
      .type('{uparrow}{downarrow}{uparrow}')
      .should('have.value', '1');
  });

  it('Total cost is acceptable with valid data', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseTotalCost
      .clear()
      .type('10')
      .should('have.value', '10');
  });

  // Add fuel expenses - sibmit button
  it('Fule expenses can`t be added with invalid data', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage.clear();
    fuelExpensesPage.expenseNumberOfLiters.clear();
    fuelExpensesPage.expenseTotalCost.clear();
    fuelExpensesPage.expenseReportDate.clear();
    fuelExpensesPage.addExpenseButton.should('be.disabled');
  });

  // Add fuel expenses
  it('Fule expenses can be added with valid data', () => {
    fuelExpensesPage.openAddExpenseModalButton.click();
    fuelExpensesPage.expenseMileage.clear().type('11');
    fuelExpensesPage.expenseNumberOfLiters.clear().type('10');
    fuelExpensesPage.expenseTotalCost.clear().type('10');
    fuelExpensesPage.addExpenseButton.click();
    fuelExpensesPage.expensesTable.should('be.visible');
    fuelExpensesPage.expensesTableDateValue.should(
      'includes.text',
      `${moment().format('DD.MM.YYYY')}`
    );
  });
});
