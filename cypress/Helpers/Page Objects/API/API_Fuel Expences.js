import moment from 'moment/moment';

export default class ApiFuelExpenses {
  addFuelExpenseRequest(createdCarId, createdCarMileage) {
    return cy.request({
      method: 'POST',
      url: 'api/expenses',
      body: {
        carId: createdCarId,
        reportedAt: moment().format('YYYY-MM-DD'),
        mileage: ++createdCarMileage,
        liters: 11,
        totalCost: 11,
        forceMileage: false,
      },
    });
  }
}