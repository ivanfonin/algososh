interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  getLength: () => number;
  getItems: () => (T | null)[];
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    console.log("before", this.tail);
    this.container[this.tail % this.size] = item;
    console.log(this.container);
    this.length++;
    this.tail = (this.tail + 1) % this.size;
    // this.tail++;
    console.log(this.tail);
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    this.length--;
    this.head = this.head === this.size ? 0 : this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };

  getHead = () => this.head;

  getTail = () => this.tail;

  isEmpty = () => this.length === 0;

  getLength = () => this.length;

  getItems = () => this.container;
}
