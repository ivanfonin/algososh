export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

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

  getSize = () => this.container.length;
}
