import HomePage from '../Helpers/Page Objects/Home Page';
import {
  homePageUrl,
  authentication,
} from '../Helpers/Base Configurations/data.json';
import GaragePage from '../Helpers/Page Objects/LoggedIn/Garage';
import FuelExpensesPage from '../Helpers/Page Objects/LoggedIn/Fuel Expenses';
import moment from 'moment/moment';
import ApiFuelExpenses from '../Helpers/Page Objects/API/API_Fuel Expences';

//DOM
let homePage = new HomePage(homePageUrl, authentication);
let garagePage = new GaragePage();
let fuelExpensesPage = new FuelExpensesPage();

//API
let fuelExpensesAPI = new ApiFuelExpenses();

//Test variables
let token;
let createdCar = {
  id: '',
  carBrandId: '',
  carModelId: '',
  brand: '',
  initialMileage: '',
  mileage: '',
};
let createdFuelExpense = {
  id: '',
  liters: '',
  mileage: '',
  totalCost: '',
  reportedAt: '',
};

describe('API && UI: Add car and add fuel expenses', () => {
  beforeEach(() => {
    cy.request('POST', 'api/auth/signin', {
      email: Cypress.env('loginEmail'),
      password: Cypress.env('loginPassword'),
      remember: false,
    }).then((response) => {
      token = response.headers['set-cookie'][0].split(';')[0];
    });
    homePage.navigate();
  });

  it('Add car with valid data', () => {
    //initiate intercept
    cy.intercept('POST', 'api/cars').as('carCreate');

    //Create car via UI
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

    //Call intercept
    cy.wait('@carCreate')
      .its('response')
      .then((response) => {
        createdCar.id = response.body.data.id;
        createdCar.carBrandId = response.body.data.carBrandId;
        createdCar.carModelId = response.body.data.carModelId;
        createdCar.brand = response.body.data.brand;
        createdCar.initialMileage = response.body.data.initialMileage;
        createdCar.mileage = response.body.data.mileage;
        expect(response.statusCode).to.eq(201);

        //Add fuel expense for the created car
        fuelExpensesAPI
          .addFuelExpenseRequest(createdCar.id, createdCar.mileage)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.carId).to.eq(createdCar.id);
            createdFuelExpense.id = response.body.data.id;
            expect(response.body.data.liters).to.eq(11);
            createdFuelExpense.liters = response.body.data.liters;
            expect(response.body.data.mileage).to.eq(++createdCar.mileage);
            createdFuelExpense.mileage = response.body.data.mileage;
            expect(response.body.data.totalCost).to.eq(11);
            createdFuelExpense.totalCost = response.body.data.totalCost;
            expect(response.body.data.reportedAt).to.eq(
              moment().format('YYYY-MM-DD')
            );
            createdFuelExpense.reportedAt = moment().format('DD.MM.YYYY');

            //Validate added fuel expense for the created car
            fuelExpensesPage.fuelExpPage.click();
            fuelExpensesPage.expensesTableDateValue.should(
              'includes.text',
              `${moment().format('DD.MM.YYYY')}`
            );
            fuelExpensesPage.expensesTableMileageValue.should(
              'have.text',
              createdFuelExpense.mileage
            );
            fuelExpensesPage.expensesTableLitersValue.should(
              'have.text',
              `${createdFuelExpense.liters}L`
            );
            fuelExpensesPage.expensesTableCostsValue.should(
              'include.text',
              createdFuelExpense.totalCost
            );
          });
      });
      
    //Return list of cards created and check was car from previous step created
    cy.request('GET', 'api/cars').then((response) => {
      let carsList = response.body.data;
      let carElement = carsList.find((element) => element.id === createdCar.id);
      expect(carElement.id).to.eq(createdCar.id);
    });
  });
});
