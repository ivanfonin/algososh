interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  getLength: () => number;
  getItems: () => T[];
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  private emptyItem: T;

  constructor(size: number, emptyItem: T) {
    this.size = size;
    this.emptyItem = emptyItem;
    this.container = Array(size).fill(emptyItem);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.length++;
    this.tail++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    console.log("dequeue item:", this.head % this.size);

    this.container[this.head % this.size] = this.emptyItem;
    console.log(this.container);
    this.length--;
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };

  clear = () => {
    this.tail = 0;
    this.head = 0;
    this.length = 0;
    this.container = Array(this.size).fill(this.emptyItem);
  };

  getHead = () => this.head;

  getTail = () => this.tail;

  isEmpty = () => this.length === 0;

  getLength = () => this.length;

  getItems = () => this.container;
}
