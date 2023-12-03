describe("Routing is working correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("Should open home page by default", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("Should open reverse string page after click on certain link", function () {
    cy.get('a[href="/recursion"]').click();
    cy.get("h3").contains("Строка");
  });

  it("should open agreement page after continue button click", function () {
    cy.contains("Обычная доставка").click();
    cy.get("button").contains("Продолжить оформление").click();
    cy.contains("Подтверждение заказа");
  });
});
