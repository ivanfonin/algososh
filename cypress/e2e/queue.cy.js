import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование работы с очередью", function () {
  const input = "[data-cy='input']";
  const submitBtn = "[data-cy='button-submit']";
  const deleteBtn = "[data-cy='button-delete']";
  const clearBtn = "[data-cy='button-clear']";
  const circles = "[class^=circle_content__]";
  const circle = "[class^=circle_circle__]";
  const head = "[class*=circle_head]";
  const tail = "[class*=circle_tail]";

  beforeEach(function () {
    cy.visit("http://localhost:3000/queue");
  });

  it("Кнопки должны быть неактивны при переходе на страницу", function () {
    cy.get(input).should("have.value", "");
    cy.get(submitBtn).should("be.disabled");
    cy.get(deleteBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
  });

  it("Проверка анимации при добавлении/удалении элментов очереди", function () {
    // Добавляем первый в очередь
    cy.get(input).type("i");
    cy.get(submitBtn).should("not.be.disabled");
    cy.get(submitBtn).click();

    cy.get(circles).then((c) => {
      // Элемент должен быть в статусе changing, в tail должно быть написано tail, в head head, должен содержать i
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("i")
        .parents(circles)
        .find(tail)
        .contains("tail")
        .parents(circles)
        .find(head)
        .contains("head");

      cy.wait(SHORT_DELAY_IN_MS);

      // После паузы у элемента должен быть статус default
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });

    // Добавляем второй элемент в очередь
    cy.get(input).type("v");
    cy.get(submitBtn).click();

    cy.get(circles).then((c) => {
      // При добавлении второй элемент должен быть в статусе changing, содержит v, в tail написано tail, в head пусто
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("v")
        .parents(circles)
        .find(tail)
        .contains("tail")
        .parents(circles)
        .find(head)
        .should("have.text", "");

      // Первый элемент должен быть в статусе default, не должно быть ничего в tail, в тексте i, в head написано head
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("i")
        .parents(circles)
        .find(tail)
        .should("have.text", "")
        .parents(circles)
        .find(head)
        .contains("head");

      cy.wait(SHORT_DELAY_IN_MS);

      // После паузы у второго элемента должен быть статус default
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });

    // Добавляем третий и четвертый элементы в очередь
    cy.get(input).type("a");
    cy.get(submitBtn).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(input).type("n");
    cy.get(submitBtn).click();

    cy.get(circles).then((c) => {
      // При добавлении 4-ый элемент должен быть в статусе changing, содержит n, в tail написано tail, в head пусто
      cy.wrap(c)
        .eq(3)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("n")
        .parents(circles)
        .find(tail)
        .contains("tail")
        .parents(circles)
        .find(head)
        .should("have.text", "");

      // Третий элемент должен быть в статусе default, содержит a, не должно быть ничего в head и в tail
      cy.wrap(c)
        .eq(2)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("a")
        .parents(circles)
        .find(tail)
        .should("have.text", "")
        .parents(circles)
        .find(head)
        .should("have.text", "");

      cy.wait(SHORT_DELAY_IN_MS);

      // После паузы у 4-го элемента должен быть статус default
      cy.wrap(c)
        .eq(3)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });

    // Удалим элемент из очереди
    cy.get(deleteBtn).click();

    cy.get(circles).then((c) => {
      // При удалении 1-ый элемент должен отобразиться в статусе changing
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        );
    });

    // Сделаем паузу
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).then((c) => {
      // После паузы 1-ый элемент должен быть пуст
      cy.wrap(c)
        .eq(0)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .should("have.text", "")
        .parents(circles)
        .find(tail)
        .should("have.text", "")
        .parents(circles)
        .find(head)
        .should("have.text", "");

      // После паузы у 2-го элемента должен быть статус default, в head должно быть head, содержит v
      cy.wrap(c)
        .eq(1)
        .find(circle)
        .should(($el) => expect($el.attr("class")).to.match(/circle_default__/))
        .contains("v")
        .parents(circles)
        .find(tail)
        .should("have.text", "")
        .parents(circles)
        .find(head)
        .contains("head");
    });

    // Очистим очередь
    cy.get(clearBtn).click();

    // Все кружки должны быть пустые.
    cy.get(circles).then((c) => {
      cy.wrap(c).eq(0).find(circle).should("have.text", "");
      cy.wrap(c).eq(1).find(circle).should("have.text", "");
      cy.wrap(c).eq(2).find(circle).should("have.text", "");
      cy.wrap(c).eq(3).find(circle).should("have.text", "");
      cy.wrap(c).eq(4).find(circle).should("have.text", "");
      cy.wrap(c).eq(5).find(circle).should("have.text", "");
      cy.wrap(c).eq(6).find(circle).should("have.text", "");
    });

    // Инпут и кнопки должны быть в исходном состоянии.
    cy.get(input).should("have.value", "");
    cy.get(submitBtn).should("be.disabled");
    cy.get(deleteBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
  });
});
