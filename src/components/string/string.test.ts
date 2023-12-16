import { reverseArr } from "./algorythm";

describe("Тестирование алгоритма разворота строки", () => {
  it("Разворачаивает строку с чётным количеством символов", () => {
    const { arr } = reverseArr(["a", "b", "c", "d"]);
    expect(arr).toEqual(["d", "c", "b", "a"]);
  });

  it("Разворачаивает строку с нечётным количеством символов", () => {
    const { arr } = reverseArr(["a", "b", "c", "d", "e"]);
    expect(arr).toEqual(["e", "d", "c", "b", "a"]);
  });

  it("Разворачаивает строку с одним символом", () => {
    const { arr } = reverseArr(["a"]);
    expect(arr).toEqual(["a"]);
  });

  it("Разворачаивает пустую строку", () => {
    const { arr } = reverseArr([]);
    expect(arr).toEqual([]);
  });
});
