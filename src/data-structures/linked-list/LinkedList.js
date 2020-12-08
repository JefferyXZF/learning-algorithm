import LinkedListNode from './LinkedListNode'
import Comparator from '../../utils/comparator/Comparator'

export default class LinkedList {
    /**
     * 
     * @param {*} ComparatorFunction 
     */
  constructor (ComparatorFunction) {
    // 头指针
    this.head = null
    // 尾指针
    this.tail = null
    // 比较函数
    this.compare = new Comparator(ComparatorFunction)
  }

  /**
   * 在链表头部添加节点: 1、新建节点；2、改变头指针；2、判断尾节点是否为空
   * @param {*} value 
   * @return {LinkedList}
   */
  prepend (value) {
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    // 空链表，将尾指针指向新节点
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  /**
   * 在链表尾部添加节点；1、创建节点；2、判断链表是否为空，为空则头节点、尾节点指向新节点；3、尾节点指向新节点，改变尾节点的指向
   * @param {*} value 
   * @return {LinkedList}
   */
  append (value) {
    const newNode = new LinkedListNode(value)

    // 链表为空
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  /**
   * 根据值删除链表节点
   * @param {*} value 
   * @return {LinkedListNode}
   */
  delete (value) {
    if (!this.head) {
      return null
    }

    let deleteNode = null

    // 值在头节点
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // 如果必须删除下一个节点，则使下一个节点成为下一个下一个节点。
      while(currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // 检查是否必须删除尾巴
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find ({ value = undefined, callback = undefined}) {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while (currentNode) {
      // 如果指定了回调，则尝试按回调查找节点
      if (callback && callback(currentNode.value)) {
        return currentNode
      }
      // 如果指定了值，则尝试按值进行比较
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * 删除链表尾节点
   * @return {LinkedListNode}
   */
  deleteTail () {
    const deleteTail = this.tail

    if (this.head === this.tail) {
      // 链表中只有一个节点
      this.head = null
      this.tail = null

      return deleteTail
    }

    let currentNode = this.head
    // 倒退到最后一个节点，并删除最后一个节点之前的节点的“下一个”链接
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deleteTail
  }

  /**
   * 删除链表头节点
   * @return {LinkedListNode}
   */
  deleteHead () {
    if (!this.head) {
      return null
    }

    const deleteHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deleteHead
  }

  /**
   * values-需要转换为链表的值数组
   * @param {*} values 
   * @return {LinkedList}
   */
  fromArray (values) {
    values.forEach((value) => this.append(value))

    return this
  }

  /**
   * 转化为链表数组
   *  @return {LinkedListNode[]}
   */
  toArray () {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * 转化为字符串
   * @param {function} callback 
   * @return {string}
   */
  toString (callback) {

    return this.toArray().map((node) => node.toString(callback)).toString()

  }

  /**
   * 反转链表
   * @returns {LinkedList}
   */
  reverse () {
     let currentNode = this.head
     let prevNode = null
     let nextNode = null

     while (currentNode) {
       // 缓存下个节点
       nextNode = currentNode.next

        // 更改当前节点的下一个节点，以便它将链接到上一个节点
       currentNode.next = prevNode

       // 将prevNode和currNode节点向前移动一步
       prevNode = currentNode
       currentNode = nextNode
     }

     // 重设头尾节点
     this.tail = this.head
     this.head = prevNode

     return this
  }

}