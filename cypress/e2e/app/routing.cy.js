describe("Routing is working correctly", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Should open Homepage by default", function () {
    cy.get("h1").contains("МБОУ АЛГОСОШ");
  });

  it("Should open String page after click on certain link", function () {
    cy.get('a[href="/recursion"]').click();
    cy.get("h3").contains("Строка");
  });

  it("Should open Fibonacci page after click on certain link", function () {
    cy.get('a[href="/fibonacci"]').click();
    cy.get("h3").contains("Последовательность Фибоначчи");
  });

  it("Should open Sorting page after click on certain link", function () {
    cy.get('a[href="/sorting"]').click();
    cy.get("h3").contains("Сортировка массива");
  });

  it("Should open Stack page after click on certain link", function () {
    cy.get('a[href="/stack"]').click();
    cy.get("h3").contains("Стек");
  });

  it("Should open Queue page after click on certain link", function () {
    cy.get('a[href="/queue"]').click();
    cy.get("h3").contains("Очередь");
  });

  it("Should open List page after click on certain link", function () {
    cy.get('a[href="/list"]').click();
    cy.get("h3").contains("Связный список");
  });
});
