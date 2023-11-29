/**
 * Функци вычисляет числа последовательности Фибоначчи от 1 до n.
 *
 * @param {integer} n Номер числа в последовательности Фибоначчи.
 *
 * @returns {Array<number>} Массив чисел последовательности Фибоначчи.
 */
export const fibonacci = (n: number) => {
  if (n === 0) return [0];
  if (n === 1) return [1, 1];
  if (n === 2) return [1, 1, 2];

  let arr: number[] = [1, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};
