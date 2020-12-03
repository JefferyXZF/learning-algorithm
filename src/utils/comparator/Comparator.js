
// 比较类
export default class Compare {
  /**
   * 构造器
   * @param {*} compareFunction Function 自定义比较的函数
   */
  constructor (compareFunction) {
    this.compare = compareFunction || Compare.defaultCompareFunction
  }

  /**
   * 静态方法，默认比较函数
   * @param {(string | number)} a 
   * @param {(string | number)} b 
   * @return {number}
   */
  static defaultCompareFunction (a, b) {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  /**
   * 比较两个数是否相等
   * @param {*} a 
   * @param {*} b 
   * @return {boolean}
   */
  equal (a, b) {
    return this.compare(a, b) === 0
  }

  /**
   * 判断 a 是否小于 b
   * @param {*} a 
   * @param {*} b 
   * @return {boolean}
   */
  lessThan (a, b) {
    return this.compare(a, b) < 0
  }

  /**
   * 判断 a 是否大于 b
   * @param {*} a 
   * @param {*} b 
   * @return {boolean}
   */
  greaterThan (a, b) {
    return this.compare(a, b) > 0
  }

  /**
   * a 小于或者等于 b
   * @param {*} a 
   * @param {*} b 
   * @return {boolean}
   */
  lessThanOrEqual (a, b) {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * a 大于或者等于 b
   * @param {*} a 
   * @param {*} b 
   * @return {boolean}
   */
  greaterThanOrEqual (a, b) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * 反转函数
   */
  reverse () {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }

}