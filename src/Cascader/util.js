// 这个方法暂时无用
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

export default class LList {
  constructor() {
    this.head = new Node("head");
    this.length = 1;
  }
  find(item) {
    var curNode = this.head;
    while (curNode.element !== item && curNode.element) {
      if (curNode.next) {
        curNode = curNode.next;
      } else {
        // 这一句保证了 假如找不到一个节点 那么自动返回链表最后一个非null的节点
        return curNode;
      }
    }

    return curNode;
  }
  insert(newElement, item) {
    var newNode = new Node(newElement);
    var curNode = this.find(item);
    newNode.next = curNode.next;
    curNode.next = newNode;
    this.length += 1;
  }
  display() {
    var curNode = this.head;
    while (curNode.next) {
      console.log(curNode.next.element);
      curNode = curNode.next;
    }
  }
  findPrev(item) {
    var curNode = this.head;
    while (curNode.next && curNode.next.element != item) {
      curNode = curNode.next;
    }
    if (curNode.next) {
      return curNode;
    } else {
      return null;
    }
  }
  remove(item) {
    var prevNode = this.findPrev(item);
    if (prevNode) {
      prevNode.next = prevNode.next.next;
      this.length -= 1;
    }
  }
}
