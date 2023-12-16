import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование алгоритма вычисления числа из последовательности Фибоначчи", function () {
  const input = "[data-cy='input']";
  const button = "[data-cy='button']";
  const circles = "[class^=circle_content__]";
  const circle = "[class^=circle_circle__]";
  const index = "[class*=circle_index__]";

  beforeEach(function () {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Кнопка запуска алгоритма должна быть неактивна, если в инпуте пусто", function () {
    cy.get(input).should("have.value", "");
    cy.get(button).should("be.disabled");
  });

  it("Если ввести 0 или число больше 19, то инпут должен быть неактивен", function () {
    cy.get(input).type("0");
    cy.get(button).should("be.disabled");
    cy.get(input).clear();
    cy.get(input).type("22");
    cy.get(button).should("be.disabled");
  });

  it("Вычисление числа последовательности работает корректно", function () {
    // После ввода текста инпут должен стать активен
    cy.get(input).type("5");
    cy.get(button).should("not.be.disabled");
    // После запуска инпут и кнопка становятся неактивны
    cy.get(button).click();
    cy.get(input).should("be.disabled");
    cy.get(button).should("be.disabled");

    cy.wait(SHORT_DELAY_IN_MS);

    // На первом шаге получаем элемент со значением 1 и индексом 0
    cy.get(circles).then((c) => {
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("0");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // На втором шаге к предыдущему добавляется элемент со значением 1 и индексом 1
    cy.get(circles).then((c) => {
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("0");

      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("1");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // На третьем шаге к предыдущим добавляется элемент со значением 2 и индексом 2
    cy.get(circles).then((c) => {
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("0");

      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("1");

      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("2")
        .parents(circles)
        .find(index)
        .contains("2");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // На третьем шаге к предыдущим добавляется элемент со значением 3 и индексом 3
    cy.get(circles).then((c) => {
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("0");

      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("1");

      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("2")
        .parents(circles)
        .find(index)
        .contains("2");

      cy.wrap(c)
        .eq(3)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("3")
        .parents(circles)
        .find(index)
        .contains("3");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // На третьем шаге к предыдущим добавляется элемент со значением 5 и индексом 4
    cy.get(circles).then((c) => {
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("0");

      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("1");

      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("2")
        .parents(circles)
        .find(index)
        .contains("2");

      cy.wrap(c)
        .eq(3)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("3")
        .parents(circles)
        .find(index)
        .contains("3");

      cy.wrap(c)
        .eq(4)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("5")
        .parents(circles)
        .find(index)
        .contains("4");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // На третьем шаге к предыдущим добавляется элемент со значением 8 и индексом 5
    cy.get(circles).then((c) => {
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("0");

      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(index)
        .contains("1");

      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("2")
        .parents(circles)
        .find(index)
        .contains("2");

      cy.wrap(c)
        .eq(3)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("3")
        .parents(circles)
        .find(index)
        .contains("3");

      cy.wrap(c)
        .eq(5)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("8")
        .parents(circles)
        .find(index)
        .contains("5");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // Проверяем, что инпут у нас теперь активен, в нем пусто и кнопка при пустом инпуте неактивна
    cy.get(input).should("not.be.disabled");
    cy.get(input).should("have.value", "");
    cy.get(button).should("be.disabled");
  });
});
