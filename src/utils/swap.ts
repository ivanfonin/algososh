/**
 * Swap to elements in the array.
 *
 * @param arr Array of any elements.
 * @param firstIndex Index of the first element to swap.
 * @param secondIndex Index of the first element to swap.
 * @returns Array with two swapped elements.
 */
export const swap = (
  arr: Array<any>,
  firstIndex: number,
  secondIndex: number
) => {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
  return arr;
};
