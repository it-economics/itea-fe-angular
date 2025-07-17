describe('itea', () => {
  it('successfully load', () => {
    cy.visit('http://localhost:4200/products');
  });

  // Aufgabe 2
  it('description in imprint is correct', () => {
    cy.visit('http://localhost:4200/products');
    cy.get('.mdc-button.mat-mdc-button').click();
    cy.get('[data-cy="imprint-description"').should("have.text", "imprint works!");
  });
});
