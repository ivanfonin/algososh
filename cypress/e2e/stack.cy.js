import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование работы со стеком", function () {
  const input = "[data-cy='input']";
  const submitBtn = "[data-cy='button-submit']";
  const deleteBtn = "[data-cy='button-delete']";
  const clearBtn = "[data-cy='button-clear']";
  const circles = "[class^=circle_content__]";
  const circle = "[class^=circle_circle__]";
  const head = "[class*=circle_head]";
  const tail = "[class*=circle_tail]";

  beforeEach(function () {
    cy.visit("http://localhost:3000/stack");
  });

  it("Кнопки должны быть неактивны при переходе на страницу", function () {
    cy.get(input).should("have.value", "");
    cy.get(submitBtn).should("be.disabled");
    cy.get(deleteBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
  });

  it("Проверка анимации при добавлении элментов в стек", function () {
    // Добавляем первый элемент в стек
    cy.get(input).type("1");
    cy.get(submitBtn).should("not.be.disabled");
    cy.get(submitBtn).click();

    cy.get(circles).then((c) => {
      // Элемент должен быть в статусе changing, в tail должен быть 0, в head top, в значении 1
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("1")
        .parents(circles)
        .find(tail)
        .contains("0")
        .parents(circles)
        .find(head)
        .contains("top");

      cy.wait(SHORT_DELAY_IN_MS);

      // После паузы у элемента должен быть статус default
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });

    // Добавляем второй элемент в стек
    cy.get(input).type("2");
    cy.get(submitBtn).click();

    cy.get(circles).then((c) => {
      // При добавлении второй элемент должен быть в статусе changing
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("2")
        .parents(circles)
        .find(tail)
        .contains("1")
        .parents(circles)
        .find(head)
        .contains("top");

      // Первый элемент должен быть в статусе default, не должно быть ничего в head, в tail 0
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("1")
        .parents(circles)
        .find(tail)
        .contains("0")
        .parents(circles)
        .find(head)
        .should("have.text", "");

      cy.wait(SHORT_DELAY_IN_MS);

      // После паузы у элемента должен быть статус default
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });

    // Добавляем третий элемент в стек
    cy.get(input).type("3");
    cy.get(submitBtn).click();

    cy.get(circles).then((c) => {
      // При добавлении третий элемент должен быть в статусе changing
      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("3")
        .parents(circles)
        .find(tail)
        .contains("2")
        .parents(circles)
        .find(head)
        .contains("top");

      // Второй элемент должен быть в статусе default, не должно быть ничего в head, в tail 0
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("2")
        .parents(circles)
        .find(tail)
        .contains("1")
        .parents(circles)
        .find(head)
        .should("have.text", "");

      cy.wait(SHORT_DELAY_IN_MS);

      // После паузы у третьего элемента должен быть статус default
      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });

    // Удалим элемент из стека
    cy.get(deleteBtn).click();

    cy.get(circles).then((c) => {
      // При удалении третий элемент должен отобразиться в статусе changing
      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        );
    });

    // Сделаем паузу
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).then((c) => {
      // После паузы у второго элемента должен быть статус default, в head должен быть top
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("2")
        .parents(circles)
        .find(tail)
        .contains("1")
        .parents(circles)
        .find(head)
        .contains("top");
    });

    // Очистим стек
    cy.get(clearBtn).click();

    // В DOM не должно быть кружков.
    cy.get(circles).should("not.exist");

    // Инпут и кнопки должны быть в исходном состоянии.
    cy.get(input).should("have.value", "");
    cy.get(submitBtn).should("be.disabled");
    cy.get(deleteBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
  });
});
