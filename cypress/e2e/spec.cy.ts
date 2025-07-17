describe('itea', () => {
  // Aufgabe 4 (Hooks)
  beforeEach(() => {
    cy.intercept('products').as('getProducts'); // Aufgabe 7 (API Call)
    cy.visit('http://localhost:4200/products')
  });

  it('successfully load', () => {
    cy.visit('http://localhost:4200/products');
  });

  // Aufgabe 2
  it('description in imprint is correct', () => {
    // cy.visit('http://localhost:4200/products');
    // cy.get('.mdc-button.mat-mdc-button').click();
    cy.get('[data-cy="imprint"').click();
    cy.get('[data-cy="imprint-description"').should("have.text", "imprint works!");
  });

  // Aufgabe 3 (Beispielszenario)
  it('correct heading', () => {
    // cy.visit('http://localhost:4200/products');
    cy.get('[data-cy="header"]').should("be.visible").and("have.text", "Itea - best furniture in town");
  });

  // Aufgabe 5 (Komplexeres Beispiel)
  it('find chair with searching', () => {
    cy.get('[data-cy="search-bar"').type("chair");
    cy.get('[data-cy="card-box"').should("have.length", 1);
    cy.get('[data-cy="product_Chair"').should("be.visible").click();
  });

  // Aufgabe 7 (API Call)
  it('details for lamps open', () => {
    cy.wait('@getProducts').then((response) => {
      console.log(response);
      cy.get('[data-cy="product_Lamp"]').click();
      cy.get('[data-cy="btn_addToCart"').should("be.visible");
    });
  });

  // Aufgabe 8 (Commands)
  it('details for lamps open with command', () => {
    cy.openDetailPage("product_Lamp").then(() => {
      cy.get('[data-cy="btn_addToCart"').click();
    });
  });
});
