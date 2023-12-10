describe("Раутинг работает исправно", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("По умолчанию должна открываться главная страница", function () {
    cy.get("h1").contains("МБОУ АЛГОСОШ");
  });

  it("По ссылке /recursion должна открываться страница Строка", function () {
    cy.get('a[href="/recursion"]').click();
    cy.get("h3").contains("Строка");
  });

  it("По ссылке /fibonacci должна открываться страница Последовательность Фибоначчи", function () {
    cy.get('a[href="/fibonacci"]').click();
    cy.get("h3").contains("Последовательность Фибоначчи");
  });

  it("По ссылке /sorting должна открываться страница Сортировка массива", function () {
    cy.get('a[href="/sorting"]').click();
    cy.get("h3").contains("Сортировка массива");
  });

  it("По ссылке /stack должна открываться страница Стек", function () {
    cy.get('a[href="/stack"]').click();
    cy.get("h3").contains("Стек");
  });

  it("По ссылке /queue должна открываться страница Очередь", function () {
    cy.get('a[href="/queue"]').click();
    cy.get("h3").contains("Очередь");
  });

  it("По ссылке /list должна открываться страница Связный список", function () {
    cy.get('a[href="/list"]').click();
    cy.get("h3").contains("Связный список");
  });
});
