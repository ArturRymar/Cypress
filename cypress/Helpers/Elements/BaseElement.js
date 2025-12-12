export default class {
    getElement(selector) {
        return cy.get(selector);
    }
    getElementByText(text) {
        return cy.contains(text);
    }
}