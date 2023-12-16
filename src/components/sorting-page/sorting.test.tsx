import { Direction } from "../../types/direction";
import { selectSort, bubbleSort } from "./algorithms";

describe("Тестирование алгоритмов сортировки", () => {
  it("Сортируем пустой массив алгоритмом Select Sort", async () => {
    const { arr } = await selectSort([]);
    expect(arr).toEqual([]);
  });

  it("Сортируем массив с одним элементом алгоритмом Select Sort", async () => {
    const { arr } = await selectSort([1]);
    expect(arr).toEqual([1]);
  });

  it("Сортируем массив алгоритмом Select Sort по возрастанию", async () => {
    const { arr } = await selectSort([3, 8, 5, 4, 7, 6], Direction.Ascending);
    expect(arr).toEqual([3, 4, 5, 6, 7, 8]);
  });

  it("Сортируем массив алгоритмом Select Sort по убыванию", async () => {
    const { arr } = await selectSort([3, 8, 5, 4, 7, 6], Direction.Descending);
    expect(arr).toEqual([8, 7, 6, 5, 4, 3]);
  });

  it("Сортируем пустой массив алгоритмом Bubble Sort", async () => {
    const { arr } = await bubbleSort([]);
    expect(arr).toEqual([]);
  });

  it("Сортируем массив с одним элементом алгоритмом Bubble Sort", async () => {
    const { arr } = await bubbleSort([1]);
    expect(arr).toEqual([1]);
  });

  it("Сортируем массив алгоритмом Bubble Sort по возрастанию", async () => {
    const { arr } = await bubbleSort([3, 8, 5, 4, 7, 6], Direction.Ascending);
    expect(arr).toEqual([3, 4, 5, 6, 7, 8]);
  });

  it("Сортируем массив алгоритмом Bubble Sort по убыванию", async () => {
    const { arr } = await bubbleSort([3, 8, 5, 4, 7, 6], Direction.Descending);
    expect(arr).toEqual([8, 7, 6, 5, 4, 3]);
  });
});
