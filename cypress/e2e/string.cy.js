import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование алгоритма разворота строки", function () {
  const input = "[data-cy='input']";
  const button = "[data-cy='button']";
  const circles = "[class^=circle_circle__]";

  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Кнопка запуска алгоритма должна быть неактивна, если в инпуте пусто", function () {
    cy.get(input).should("have.value", "");
    cy.get(button).should("be.disabled");
  });

  it("Разворот строки работает корректно", function () {
    // После ввода текста инпут должен стать активен
    cy.get(input).type("ivan");
    cy.get(button).should("not.be.disabled");
    // После запуска инпут и кнопка становятся неактивны
    cy.get(button).click();
    cy.get(input).should("be.disabled");
    cy.get(button).should("be.disabled");

    cy.wait(DELAY_IN_MS);

    // На первом шаге первый с последним элементы должны быть в статусе changing
    cy.get(circles).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("i");

      cy.wrap(circle)
        .eq(1)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("v");

      cy.wrap(circle)
        .eq(2)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("a");

      cy.wrap(circle)
        .eq(3)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("n");
    });

    cy.wait(DELAY_IN_MS);

    // На втором шаге первый с последним элементы должны быть в статусе modified
    cy.get(circles).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("n");

      cy.wrap(circle)
        .eq(1)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("v");

      cy.wrap(circle)
        .eq(2)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("a");

      cy.wrap(circle)
        .eq(3)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("i");
    });

    cy.wait(DELAY_IN_MS);

    // На третьем шаге первый с последним элементы должны быть в статусе modified, а 2 и 3 в статусе changing
    cy.get(circles).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("n");

      cy.wrap(circle)
        .eq(1)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("v");

      cy.wrap(circle)
        .eq(2)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("a");

      cy.wrap(circle)
        .eq(3)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("i");
    });

    cy.wait(DELAY_IN_MS);

    // На последнем шаге все элементы должны быть в статусе modified
    cy.get(circles).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("n");

      cy.wrap(circle)
        .eq(1)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("a");

      cy.wrap(circle)
        .eq(2)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("v");

      cy.wrap(circle)
        .eq(3)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("i");
    });

    cy.wait(DELAY_IN_MS);

    // Проверяем, что инпут у нас теперь активен, в нем пусто и кнопка при пустом инпуте неактивна
    cy.get(input).should("not.be.disabled");
    cy.get(input).should("have.value", "");
    cy.get(button).should("be.disabled");
  });
});
