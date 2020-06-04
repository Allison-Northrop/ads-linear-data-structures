import { NoEmitOnErrorsPlugin } from "webpack";

class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const newNode = new this.Node({element});
    newNode.next = this._head();
    newNode.prev = this._sentinel;
    this._head().prev = newNode;
    this._sentinel.next = newNode;

    return newNode;
  }

  insertTail(element) {
    const newNode = new this.Node({element});
    newNode.next = this._sentinel;
    newNode.prev = this._tail()
    this._tail().next = newNode;
    this._sentinel.prev = newNode;

    return newNode;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove();
    }
  }

  forEach(callback) {
    let i = 0;
    let node = this._head();
    while (node != this._sentinel) {
      callback(node.element, i, this);
      i++
      node = node.next;
    }
  }

  count() { 
    let counter = 0;
    this.forEach(() => counter += 1);
    return counter;
  }
}

export default DoublyLinkedList;
