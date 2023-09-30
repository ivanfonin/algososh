export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  insertAt: (element: T, position: number) => void;
  deleteAt: (position: number) => void;
  prepend: (element: T) => void;
  append: (element: T) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (curr) {
          if (currIndex === index - 1) {
            break;
          }
          curr = curr.next;
          currIndex++;
        }

        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }

      this.size++;
    }
  }

  deleteAt(position: number) {
    if (position < 0 || position >= this.size || this.head === null) {
      console.log("Invalid position or empty list.");
      return;
    }

    if (position === 0) {
      this.head = this.head.next;
    } else {
      let curr: Node<T> | null = this.head;
      let prev: Node<T> | null = null;
      let currIndex = 0;

      while (curr && currIndex < position) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (curr && prev) {
        prev.next = curr.next;
      }
    }

    this.size--;
  }

  prepend(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getItems() {
    let curr = this.head;
    let items = [];
    while (curr) {
      items.push(curr.value);
      curr = curr.next;
    }
    return items;
  }

  getItem(index: number) {
    if (index < 0 || index > this.size || this.head === null) {
      console.log("List is empty, or index is not valid");
      return;
    }

    if (index === 0) {
      return this.head.value;
    }

    let curr: Node<T> | null = this.head;
    let currIndex = 0;

    while (curr) {
      if (currIndex === index - 1) {
        return curr.value;
      }
      curr = curr.next;
      currIndex++;
    }
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
