import { swap } from "../../utils/swap";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TColumn } from "../../types/sorting-page";

/**
 * Функция разворачивает наоброт массив элементов, представляющих собой символы в строке.
 *
 * @param {Array} arr – Массив объектов TColumn для сортировки.
 * @param {String} order – Порядок сортировки.
 *
 * @return {Array} - Двумерный массив шагов c результатами перестановки на каждом шаге.
 */
export const selectSort = async (arr: TColumn[], order: Direction) => {
  const { length } = arr;
  const result = JSON.parse(JSON.stringify(arr)); // Полная копия массива с объектами внутри
  const steps: TColumn[][] = [];
  steps.push(JSON.parse(JSON.stringify(result))); // Начальное состояние

  for (let i = 0; i < length - 1; i++) {
    let targetInd = i;
    let targetEl = result[i].index;
    for (let j = i; j < length; j++) {
      result[i].state = ElementStates.Changing;
      result[j].state = ElementStates.Changing;
      steps.push(JSON.parse(JSON.stringify(result))); // Подсвечиваем изменяемые элементы
      if (
        (order === Direction.Descending && result[j].index > targetEl) ||
        (order === Direction.Ascending && result[j].index < targetEl)
      ) {
        targetInd = j;
        targetEl = result[j].index;
      }
      result[i].state = ElementStates.Default;
      result[j].state = ElementStates.Default;
    }
    swap(result, i, targetInd);
    result[i].state = ElementStates.Modified;
  }
  result[length - 1].state = ElementStates.Modified;
  steps.push(JSON.parse(JSON.stringify(result))); // Подсвечиваем измененные элементы

  return steps;
};

export const bubbleSort = async (arr: TColumn[], order: Direction) => {
  const { length } = arr;
  const result = JSON.parse(JSON.stringify(arr)); // Полная копия массива и объектов внутри
  const steps: TColumn[][] = [];
  steps.push(JSON.parse(JSON.stringify(result))); // Начальное состояние

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      result[j].state = ElementStates.Changing;
      result[j + 1].state = ElementStates.Changing;
      steps.push(JSON.parse(JSON.stringify(result))); // Подсвечиваем изменяемые элементы
      if (
        (order === Direction.Ascending &&
          result[j].index < result[j + 1].index) ||
        (order === Direction.Descending &&
          result[j].index > result[j + 1].index)
      ) {
        swap(result, j, j + 1);
      }
      result[j].state = ElementStates.Default;
    }
    result[length - i - 1].state = ElementStates.Modified;
    steps.push(JSON.parse(JSON.stringify(result))); // Подсвечиваем измененные элементы
  }

  return steps;
};
