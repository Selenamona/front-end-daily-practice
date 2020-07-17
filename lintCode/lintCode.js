// 链表节点
class ListNode{
  constructor(val){
      this.val = val;
      this.next = null;
  }
}
// 将数组转化为链表
class chainList(arr){
  let head = new ListNode(arr[0]);
  let tail = head;
  for (let i = 1; i < arr.length; i++) {
      let node = new ListNode(arr[i]);
      tail.next = node;
      tail = node;
  }
  return head;
}

var chain = new chainList([1,2,3,null]);
console.log(chain)

// 构建一个栈
const createStack = () => {
  class Stack{
      constructor(){
          this.top = 0;
          this.stores = [];
      }
      push(item){
          this.top++;
          return this.stores.push(item)
      }
      pop(){
          this.top--
          return this.stores.pop()
      }
      peer(){
          return this.stores[this.stores.length-1]
      }
      isEmpty(){
          return this.top == 0;
      }
  }
  return new Stack();
}

// 翻转一个链表

const reverse = function (head) {
  if (!head){
      return null;
  }
  let node = head;
  let stack = createStack();
  while (node != null) {
      stack.push(node);
      node = node.next;
  }
  let newHead = null, tail = null;
  while (!stack.isEmpty()) {
      let node = stack.pop();
      if (!newHead) {
          newHead = tail = node;
      }
      tail.next = node;
      tail = node;
  }
  tail.next = null;
  return newHead
}


