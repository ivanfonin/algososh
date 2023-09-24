import { swap } from "../../utils/swap";

/**
 * Функция разворачивает строку.
 *
 * @param {String} str – Строка текста.
 *
 * @return {String} Перевернутая строка текста.
 */
export const reverseString = (str: string) => {
  const arr = str.split("");
  for (let i = 0; i < Math.ceil(str.length / 2); i++) {
    swap(arr, i, str.length - i - 1);
  }
  return arr.join("");
};
