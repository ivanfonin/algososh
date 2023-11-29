import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  getLength: () => number;
  getItems: () => T[];
  setItemState: (i: number, state: ElementStates) => void;
}

export class Queue<T extends { state: ElementStates }> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  private emptyItem: T;

  constructor(size: number, emptyItem: T) {
    this.size = size;
    this.emptyItem = emptyItem;
    this.container = Array(size);
    for (let i = 0; i < size; i++) {
      // Использую копию пустого объекта, а не ссылку,
      // чтобы потом устанавливать state индивидуально.
      this.container[i] = JSON.parse(JSON.stringify(this.emptyItem));
    }
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

    this.container[this.head % this.size] = this.emptyItem;
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
    this.container = Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.container[i] = JSON.parse(JSON.stringify(this.emptyItem));
    }
  };

  getHead = () => this.head;

  getTail = () => this.tail;

  isEmpty = () => this.length === 0;

  getLength = () => this.length;

  getItems = () => this.container;

  setItemState = (i: number, state: ElementStates) => {
    this.container[i].state = state;
  };
}
