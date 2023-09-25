import { swap } from "../../utils/swap";
import { pause } from "../../utils/pause";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

/**
 * Функция наоброт массив элементов, представляющих собой символы в строке.
 *
 * @param {Array} letters – Массив объектов букв с состоянием.
 * @param {Function} setCircles - Функция устанвливает стейт букв.
 * @param {Function} setIsAnimating - Функция устанвливает стейт анимации.
 *
 * @return {void}
 */
export const reverseArray = async (
  letters: any,
  setCircles: any,
  setIsAnimating: any
) => {
  setIsAnimating(true);
  await pause(DELAY_IN_MS);
  for (let i = 0; i < Math.ceil(letters.length / 2); i++) {
    // Подсвечиваем элементы, которые меняются местами.
    if (i !== letters.length - i - 1) {
      letters[i].state = ElementStates.Changing;
      letters[letters.length - i - 1].state = ElementStates.Changing;
      setCircles([...letters]);
    }
    // Делаем паузу.
    await pause(DELAY_IN_MS);
    // Делаем перестановку и подсвечиваем элементы, которые поменяли.
    swap(letters, i, letters.length - i - 1);
    letters[i].state = ElementStates.Modified;
    letters[letters.length - i - 1].state = ElementStates.Modified;
    setCircles([...letters]);
  }
  setIsAnimating(false);
};
