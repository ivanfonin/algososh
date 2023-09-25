/**
 * Функци вычисляет число последовательности Фибоначчи по порядковому номеру.
 *
 * @param {integer} n Номер числа в последовательности Фибоначчи.
 *
 * @returns {Array<number>} Массив чисел из последовательности Фибоначчи от первого до n.
 */
export const fibonacci = (n: number) => {
  let arr: number[] = [1, 1];
  let i;
  for (i = 2; i <= n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};
