describe('itea', () => {
  // Aufgabe 2c
  beforeEach(() => {
    cy.intercept('products').as('getProducts'); // c
    cy.visit('http://localhost:4200/products')
  });

  // Aufgabe 1
  it.skip('successfully load', () => {
    cy.visit('http://localhost:4200/products')
  });

  // Aufgabe 2a
  it('correct heading', () => {
    // cy.visit('http://localhost:4200/products') // Aufgabe 2c
    cy.get('[data-cy="header"]').should("have.text", "Itea - best furniture in town")
  });

  // Aufgabe 2b
  it('lamp exists', () => {
    // cy.visit('http://localhost:4200/products') // Aufgabe 2c
    cy.get('[data-cy="product_Lamp"]').should("be.visible");
  });

  // Aufgabe 5
  it('details for lamps open', () => {
    cy.wait('@getProducts').then((response) => { // c
      console.log(response); // c
      cy.get('[data-cy="product_Lamp"]').click(); // a
      cy.get('[data-cy="btn_addToCart"').should("be.visible"); // a
    });
  });

  // Aufgabe 6
  it('details for table open', () => {
    // cy.wait('@getProducts').then((response) => { // c
    //   cy.get('[data-cy="product_Table"]').click(); // a
    //   cy.get('[data-cy="btn_addToCart"').should("be.visible"); // a
    // });

    // Aufgabe 6b
    cy.openDetailPage("product_Table").then(() => {
      // TODO: Button klick
      cy.get('[data-cy="btn_addToCart"').click(); // c
    });
  });
});
