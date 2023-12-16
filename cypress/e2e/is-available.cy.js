describe("Приложение доступно", function () {
  it("Должно быть доступно по адресу localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });
});
