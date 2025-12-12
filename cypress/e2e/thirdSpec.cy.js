import HomePage from '../Helpers/Page Objects/Home Page';
import {
  homePageUrl,
  authentication,
} from '../Helpers/Base Configurations/data.json';
import RegistrationModal from '../Helpers/Page Objects/Registration';
import { faker } from '@faker-js/faker';

let homePage = new HomePage(homePageUrl, authentication);
let registrationModal = new RegistrationModal();
let registrationUser = {
  email: faker.internet.email(),
  password: 'Qwerty25',
};

describe('Registration suite', () => {
  beforeEach(() => {
    homePage.navigate();
    homePage.signUpButton.click();
  });

  it('Registration modal is opened', () => {
    registrationModal.modalTitle.should('have.text', 'Registration');
  });

  //Name field
  it('Name field is required', () => {
    registrationModal.signupName.clear();
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Name required')
      .should('be.visible');
    registrationModal.signupName.should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  it('Name field has min 2 and max 20 symbols', () => {
    registrationModal.signupName.type('Q');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Name has to be from 2 to 20 characters long')
      .should('be.visible');
    registrationModal.signupName.clear();
    registrationModal.signupName.type('Qwertyuiopasdfghjklzx');
    registrationModal.invalidFeedbackBlock
      .contains('Name has to be from 2 to 20 characters long')
      .should('be.visible');
  });

  it('Name field is failed with number, spec symbols and not English', () => {
    registrationModal.signupName.clear();
    registrationModal.signupName.type('12A');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Name is invalid')
      .should('be.visible');

    registrationModal.signupName.clear();
    registrationModal.signupName.type('A*');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Name is invalid')
      .should('be.visible');

    registrationModal.signupName.clear();
    registrationModal.signupName.type('Artур');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Name is invalid')
      .should('be.visible');
  });

  it('Add valid Name during registration (here is trim)', () => {
    registrationModal.signupName.clear();
    registrationModal.signupName
      .type(' Artur')
      .invoke('val')
      .then((value) => {
        expect(value.trim()).to.equal('Artur');
      });
  });

  //Last Name field
  it('Last Name field is required', () => {
    registrationModal.signupLastName.clear();
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Last name required')
      .should('be.visible');
    registrationModal.signupLastName.should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  it('Last Name field has min 2 and max 20 symbols', () => {
    registrationModal.signupLastName.type('Q');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Last name has to be from 2 to 20 characters long')
      .should('be.visible');
    registrationModal.signupLastName.clear();
    registrationModal.signupLastName.type('Qwertyuiopasdfghjklzx');
    registrationModal.invalidFeedbackBlock
      .contains('Last name has to be from 2 to 20 characters long')
      .should('be.visible');
  });

  it('Last Name field is failed with number, spec symbols and not English', () => {
    registrationModal.signupLastName.clear();
    registrationModal.signupLastName.type('12A');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Last name is invalid')
      .should('be.visible');

    registrationModal.signupLastName.clear();
    registrationModal.signupLastName.type('A*');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Last name is invalid')
      .should('be.visible');

    registrationModal.signupLastName.clear();
    registrationModal.signupLastName.type('Artур');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Last name is invalid')
      .should('be.visible');
  });

  it('Add valid Last Name during registration', () => {
    registrationModal.signupLastName.clear();
    registrationModal.signupLastName
      .type(' Rymar')
      .invoke('val')
      .then((value) => {
        expect(value.trim()).to.equal('Rymar');
      });
  });

  //Email
  it('Email field is required', () => {
    registrationModal.signupEmail.clear();
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Email required')
      .should('be.visible');
    registrationModal.signupEmail.should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  it('See error message for invalid email', () => {
    registrationModal.signupEmail.clear();
    registrationModal.signupEmail.type('test.com'); //missing @
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Email is incorrect')
      .should('be.visible');

    registrationModal.signupEmail.clear();
    registrationModal.signupEmail.type('test@gmail'); //missing top level domain
    registrationModal.invalidFeedbackBlock
      .contains('Email is incorrect')
      .should('be.visible');

    registrationModal.signupEmail.clear();
    registrationModal.signupEmail.type('test@.com'); //missing domain name
    registrationModal.invalidFeedbackBlock
      .contains('Email is incorrect')
      .should('be.visible');

    registrationModal.signupEmail.clear();
    registrationModal.signupEmail.type('@gmail.com'); //missing local part
    registrationModal.invalidFeedbackBlock
      .contains('Email is incorrect')
      .should('be.visible');

    registrationModal.signupEmail.clear();
    registrationModal.signupEmail.type('artur tester@gmail.com'); //space in local part
    registrationModal.invalidFeedbackBlock
      .contains('Email is incorrect')
      .should('be.visible');

    registrationModal.signupEmail.clear();
    registrationModal.signupEmail.type('artur tester@gmail..com'); //two ..
    registrationModal.invalidFeedbackBlock
      .contains('Email is incorrect')
      .should('be.visible');
  });

  it('Valid email is acceptable', () => {
    registrationModal.signupEmail.clear();
    registrationModal.signupEmail
      .type('tester@gmail.com')
      .should('have.value', 'tester@gmail.com');
  });

  //Password
  it('Password field is required', () => {
    registrationModal.signupPassword.clear();
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Password required')
      .should('be.visible');
    registrationModal.signupPassword.should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  it('Password lenght is min=8 and max=15 symbols', () => {
    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('2');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Password has to be from 8 to 15 characters long')
      .should('be.visible');

    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('12345678901234Aa');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Password has to be from 8 to 15 characters long')
      .should('be.visible');
  });

  it('Password contains least one integer, capital, and small letter symbols', () => {
    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('A1');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains(
        'contain at least one integer, one capital, and one small letter'
      )
      .should('be.visible');

    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('a1');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains(
        'contain at least one integer, one capital, and one small letter'
      )
      .should('be.visible');

    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('Aa');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains(
        'contain at least one integer, one capital, and one small letter'
      )
      .should('be.visible');
  });

  it('Valid password is acceptable', () => {
    registrationModal.signupPassword.clear();
    registrationModal.signupPassword
      .type('Qwerty25', { sensitive: true })
      .should('have.value', 'Qwerty25');
  });

 
  //Re-enter password
  it('Re-enter password field is required', () => {
    registrationModal.passwordConfirmation.clear();
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Re-enter password required')
      .should('be.visible');
    registrationModal.passwordConfirmation.should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  it('Error if Re-enter password and password are differrent', () => {
    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('Qwerty25');
    registrationModal.passwordConfirmation.clear();
    registrationModal.passwordConfirmation.type('Qwerty266565');
    registrationModal.modalTitle.click();
    registrationModal.invalidFeedbackBlock
      .contains('Passwords do not match')
      .should('be.visible');
  });

  it('No error if Re-enter password matches password', () => {
    registrationModal.signupPassword.clear();
    registrationModal.signupPassword.type('Qwerty25');
    registrationModal.passwordConfirmation.clear();
    registrationModal.passwordConfirmation.type('Qwerty25');
    registrationModal.modalTitle.click();
    registrationModal.signUpModal
      .contains('Passwords do not match')
      .should('not.exist');
  });

  //Register button
  it('Register buttton is disabled if data is incorrect', () => {
    //перевірив лише одну умову некоректної дати, не клонив майже однакові тести
    registrationModal.signupName.clear();
    registrationModal.signupLastName.clear();
    registrationModal.signupEmail.clear();
    registrationModal.signupPassword.clear();
    registrationModal.passwordConfirmation.clear();
    registrationModal.registrationButton.should('be.disabled');
  });

  it('Registration successfully submitted', () => {
    registrationModal.signupName.clear().type('Tester');
    registrationModal.signupLastName.clear().type('Tester');
    registrationModal.signupEmail.clear().type(faker.internet.email());
    registrationModal.signupPassword.clear().type('Qwerty25');
    registrationModal.passwordConfirmation.clear().type('Qwerty25');
    registrationModal.registrationButton.should('not.be.disabled').click();
    cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
  });
});

describe('Login suite', () => {
  before(() => {
    homePage.navigate();
    homePage.signUpButton.click();
  });

  it('Registered user can login', () => {
    registrationModal.signupName.clear().type('Tester');
    registrationModal.signupLastName.clear().type('Tester');
    registrationModal.signupEmail.clear().type(registrationUser.email);
    registrationModal.signupPassword.clear().type('Qwerty25');
    registrationModal.passwordConfirmation.clear().type('Qwerty25');
    registrationModal.registrationButton.click();
    homePage.logoutButton.should("be.visible").click();

    homePage.signInButton.click();
    homePage.userLogin(registrationUser.email, registrationUser.password);
  });
});
