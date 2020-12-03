
export default class Stack {
  constructor () {
    this.stack = []
  }

  push (item) {
    this.stack.push(item)
  }

  pop () {
    return this.stack.pop()
  }

  getSize () {
    return this.stack.length
  }

  peek () {
    return this.stack[this.stack.length - 1]
  }

  clear () {
    this.stack.length = 0
  }
}