import { swap } from "../../utils/swap";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/string";

/**
 * Функция разворачивает наоброт массив элементов, представляющих собой символы в строке.
 *
 * @param {Array} letters – Массив объектов TLetter для разворота.
 *
 * @return {Array} - Двумерный массив шагов c результатами перестановки на каждом шаге.
 */
export const reverseArr = (letters: TLetter[]) => {
  const steps: TLetter[][] = [];
  steps.push(JSON.parse(JSON.stringify(letters))); // Начальное состояние
  for (let i = 0; i < Math.ceil(letters.length / 2); i++) {
    if (i !== letters.length - i - 1) {
      letters[i].state = ElementStates.Changing;
      letters[letters.length - i - 1].state = ElementStates.Changing;
      steps.push(JSON.parse(JSON.stringify(letters))); // Переставляемые элементы выделены
    }
    swap(letters, i, letters.length - i - 1);
    letters[i].state = ElementStates.Modified;
    letters[letters.length - i - 1].state = ElementStates.Modified;
    steps.push(JSON.parse(JSON.stringify(letters))); // Переставленные элементы выделены
  }
  return steps;
};
