export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  getItems: () => T[] | [];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  constructor(initialItems?: T[]) {
    if (initialItems) {
      this.container = initialItems;
    }
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    return this.container.length
      ? this.container[this.container.length - 1]
      : null;
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;

  getItems = (): T[] => this.container;
}
