import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование работы со связным списком", function () {
  const inputText = "[data-cy='input-text']";
  const inputIndex = "[data-cy='input-index']";
  const addHeadBtn = "[data-cy='button-add-head']";
  const addTailBtn = "[data-cy='button-add-tail']";
  const deleteHeadBtn = "[data-cy='button-delete-head']";
  const deleteTailBtn = "[data-cy='button-delete-tail']";
  const addIndexBtn = "[data-cy='button-add-index']";
  const deleteIndexBtn = "[data-cy='button-delete-index']";
  const listItems = "[class^=linked-list_listitem__]";
  const circleContent = "[class^=circle_content__]";
  const circle = "[class^=circle_circle__]";
  const circleSmall = "[class*=circle_small__]";
  const head = "[class*=circle_head]";
  const tail = "[class*=circle_tail]";
  const index = "[class*=circle_index]";

  beforeEach(function () {
    cy.visit("http://localhost:3000/list");
  });

  it("При переходе на страницу должны быть сгенерированы 4 дефолтных элемента, инпуты пусты, кнопки удаления из head и tail активны, остальные неактивны", function () {
    cy.get(listItems).should("have.length", 4);
    cy.get(inputText).should("have.value", "");
    cy.get(inputIndex).should("have.value", "");
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(addTailBtn).should("be.disabled");
    cy.get(addIndexBtn).should("be.disabled");
    cy.get(deleteIndexBtn).should("be.disabled");
    cy.get(deleteHeadBtn).should("not.be.disabled");
    cy.get(deleteTailBtn).should("not.be.disabled");
  });

  it("Элемент корректно добавляется в head", function () {
    // Добавим элемент в head
    cy.get(inputText).type("i");
    cy.get(addHeadBtn).click();

    // Маленький кружок в статусе changing должен появиться над первым элементом списка и содержать текст i
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find(circleSmall)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("i");
    });

    // Делаем паузу
    cy.wait(DELAY_IN_MS);

    // Теперь элементов списка на странице должно быть 5
    cy.get(listItems).should("have.length", 5);

    // Первый элемент должен быть в статусе modidfied и содержать текст i, в head должно быть head, в index 0
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("i")
        .parents(circleContent)
        .find(head)
        .contains("head")
        .parents(circleContent)
        .find(index)
        .contains("0");
    });

    // Делаем паузу
    cy.wait(DELAY_IN_MS);

    // После паузы первый элемент должен быть в статусе default
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });
  });

  it("Элемент корректно добавляется в tail", function () {
    // Добавим элемент в tail
    cy.get(inputText).type("v");
    cy.get(addTailBtn).click();

    // Маленький кружок в статусе changing должен появиться над последним элементом списка и содержать текст v
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(3)
        .find(circleSmall)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("v");
    });

    // Делаем паузу
    cy.wait(DELAY_IN_MS);

    // Теперь элементов списка на странице должно быть 5
    cy.get(listItems).should("have.length", 5);

    // Последний элемент должен быть в статусе modidfied и содержать текст v, в head должно быть пусто, в tail tail, в index 4
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(4)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("v")
        .parents(circleContent)
        .find(head)
        .should("have.text", "")
        .parents(circleContent)
        .find(index)
        .contains("4")
        .parents(circleContent)
        .find(tail)
        .contains("tail");
    });

    // Делаем паузу
    cy.wait(DELAY_IN_MS);

    // После паузы первый элемент должен быть в статусе default
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });
  });

  it("Элемент корректно добавляется по индексу", function () {
    // Добавим элемент по индексу
    cy.get(inputText).type("a");
    cy.get(inputIndex).type(1);
    cy.get(addIndexBtn).click();

    // Маленький кружок в статусе changing должен появиться над 1-ым элементом списка и содержать текст a
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find(circleSmall)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("a");
    });

    // Делаем паузу
    cy.wait(DELAY_IN_MS);

    // Первый элемент должен быть в статусе changing, в head должно быть head, в index 0
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .parents(circleContent)
        .find(head)
        .contains("head")
        .parents(circleContent)
        .find(index)
        .contains("0");
    });

    // Второй элемент должен быть в статусе default и содержать внутри маленький кружок в статусе changing с текстом a, в index 1
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(1)
        .find(index)
        .contains("1")
        .parents(listItems)
        .find(circleSmall)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_changing__/)
        )
        .contains("a");
    });

    // Теперь элементов списка на странице должно быть 5
    cy.get(listItems).should("have.length", 5);

    // После паузы второй элемент должен быть в статусе modified
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(1)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_modified__/)
        )
        .contains("a");
    });

    // Делаем паузу
    cy.wait(DELAY_IN_MS);

    // После паузы второй элемент должен поменять статус на default
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(1)
        .find(circle)
        .should(($el) =>
          expect($el.attr("class")).to.match(/circle_default__/)
        );
    });
  });

  it("Элемент корректно удаляется из head", function () {
    // Определяем функцию для удаления элемента из head асинхронно после того, как сохраним текст элемента
    function delteElementFromHead(text) {
      // Кликаем на кнопку удалить
      cy.get(deleteHeadBtn).click();

      // Маленький кружок в статусе changing должен появиться под первым элементом списка и содержать текст 'text'
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(0)
          .find(circleSmall)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_changing__/)
          )
          .contains(text);
      });

      // Делаем паузу
      cy.wait(DELAY_IN_MS);

      // Теперь элементов списка на странице должно быть 3
      cy.get(listItems).should("have.length", 3);

      // Первый элемент должен быть в статусе default, в head должно быть head, в index 0
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(0)
          .find(circle)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_default__/)
          )
          .parents(circleContent)
          .find(head)
          .contains("head")
          .parents(circleContent)
          .find(index)
          .contains("0");
      });
    }

    // Сохраним текст первого элемента и после этого будем удалять элемент из head
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(0)
        .find("[class*=circle_letter__]")
        .invoke("text")
        .then((text) => delteElementFromHead(text));
    });
  });

  it("Элемент корректно удаляется из tail", function () {
    // Определяем функцию для удаления элемента из tail асинхронно после того, как сохраним текст элемента
    function delteElementFromTail(text) {
      // Кликаем на кнопку удалить
      cy.get(deleteTailBtn).click();

      // Маленький кружок в статусе changing должен появиться под последним элементом списка и содержать текст 'text'
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(3)
          .find(circleSmall)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_changing__/)
          )
          .contains(text);
      });

      // Делаем паузу
      cy.wait(DELAY_IN_MS);

      // Теперь элементов списка на странице должно быть 3
      cy.get(listItems).should("have.length", 3);

      // Последний элемент должен быть в статусе default, в tail должно быть tail, в index 2
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(2)
          .find(circle)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_default__/)
          )
          .parents(circleContent)
          .find(tail)
          .contains("tail")
          .parents(circleContent)
          .find(index)
          .contains("2");
      });
    }

    // Сохраним текст последнего элемента и после этого будем удалять элемент из tail
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(3)
        .find("[class*=circle_letter__]")
        .invoke("text")
        .then((text) => delteElementFromTail(text));
    });
  });

  it("Элемент корректно удаляется по индексу", function () {
    const deleteIndex = 2;

    // Удалим элемент по индексу
    cy.get(inputIndex).type(deleteIndex);
    cy.get(deleteIndexBtn).click();

    // Функция удаления элемента
    function deleteElementByIndex(text) {
      cy.log(text, deleteIndex);

      // Первый элемент должен перейти в статус changing
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(0)
          .find(circle)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_changing__/)
          );
      });

      // Делаем паузу
      cy.wait(DELAY_IN_MS);

      // Второй элемент должен перейти в статус changing
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(1)
          .find(circle)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_changing__/)
          );
      });

      // Делаем паузу
      cy.wait(DELAY_IN_MS);

      // Маленький кружок в статусе changing должен появиться под 3-им элементом списка с текстом 'text'
      cy.get(listItems).then((li) => {
        cy.wrap(li)
          .eq(2)
          .find(circle)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_default__/)
          )
          .parents(listItems)
          .find(circleSmall)
          .should(($el) =>
            expect($el.attr("class")).to.match(/circle_changing__/)
          )
          .contains(text);
      });

      // Делаем паузу
      cy.wait(DELAY_IN_MS);

      // Теперь элементов списка на странице должно быть 3
      cy.get(listItems).should("have.length", 3);
    }

    // Сохраним текст элемента нужного индекса и после этого будем удалять элемент
    cy.get(listItems).then((li) => {
      cy.wrap(li)
        .eq(deleteIndex)
        .find("[class*=circle_letter__]")
        .invoke("text")
        .then((text) => deleteElementByIndex(text));
    });
  });
});
