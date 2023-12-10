import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование алгоритма разворота строки", function () {
  const stringInput = "[data-cy='string-input']";
  const stringButton = "[data-cy='string-button']";

  const circleCircle = "[class^=circle_circle__]";

  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Кнопка запуска алгоритма должна быть неактивна, если в инпуте пусто", function () {
    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
  });

  it("Разворот строки работает корректно", function () {
    // После ввода текста инпут должен стать активен
    cy.get(stringInput).type("ivan");
    cy.get(stringButton).should("not.be.disabled");
    // После клика инпут и кнопка становятся неактивны
    cy.get(stringButton).click();
    cy.get(stringInput).should("be.disabled");
    cy.get(stringButton).should("be.disabled");

    cy.wait(DELAY_IN_MS);

    // На первом шаге первый с последним элементы должны быть в статусе changing
    cy.get(circleCircle).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .invoke("attr", "class")
        .should("match", /circle_changing__/);

      cy.wrap(circle)
        .eq(1)
        .invoke("attr", "class")
        .should("match", /circle_default__/);

      cy.wrap(circle)
        .eq(2)
        .invoke("attr", "class")
        .should("match", /circle_default__/);

      cy.wrap(circle)
        .eq(3)
        .invoke("attr", "class")
        .should("match", /circle_changing__/);
    });

    cy.wait(DELAY_IN_MS);

    // На втором шаге первый с последним элементы должны быть в статусе modified
    cy.get(circleCircle).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);

      cy.wrap(circle)
        .eq(1)
        .invoke("attr", "class")
        .should("match", /circle_default__/);

      cy.wrap(circle)
        .eq(2)
        .invoke("attr", "class")
        .should("match", /circle_default__/);

      cy.wrap(circle)
        .eq(3)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);
    });

    cy.wait(DELAY_IN_MS);

    // На третьем шаге первый с последним элементы должны быть в статусе modified, а 2 и 3 в статусе changing
    cy.get(circleCircle).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);

      cy.wrap(circle)
        .eq(1)
        .invoke("attr", "class")
        .should("match", /circle_changing__/);

      cy.wrap(circle)
        .eq(2)
        .invoke("attr", "class")
        .should("match", /circle_changing__/);

      cy.wrap(circle)
        .eq(3)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);
    });

    cy.wait(DELAY_IN_MS);

    // На последнем шаге все элементы должны быть в статусе modified
    cy.get(circleCircle).then((circle) => {
      cy.wrap(circle)
        .eq(0)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);

      cy.wrap(circle)
        .eq(1)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);

      cy.wrap(circle)
        .eq(2)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);

      cy.wrap(circle)
        .eq(3)
        .invoke("attr", "class")
        .should("match", /circle_modified__/);
    });

    cy.wait(DELAY_IN_MS);

    // Проверяем, что инпут у нас теперь активен, в нем пусто и кнопка при пустом инпуте неактивна
    cy.get(stringInput).should("not.be.disabled");
    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
  });
});
