// 模拟实现 promise 原理

/**
 * 处理 resolver 函数
 * @param {Object} self promise 实例 
 * @param {Function} then 构造 promise 实例的参数
 */
const safelyResolveThen = (self, then) => {
  let called = false;
  try {
    then((value) => {
      if (called) {
        return ;
      }
      called = true;
      doResolve(self, value);
    }, (error) => {
      if (called) {
        return
      }
      called = true;
      doReject(self, error);
    })
  } catch (error) {
    if (called) {
      return ;
    }
    called = true;
    doReject(self, error);
  }
}


class Promise {
  constructor(resolver) {
    if (!isFunction(resolver)) {
      throw new TypeError('resolver must be a function');
    }
    this.state = PENDING;
    this.value = undefined;
    this.queue = [];
    if (resolver !== INTERNAL) {
      safelyResolveThen(this, resolver);
    }
  }
  then(resolve, reject) {
    // const promise = new Promise(() => {});
    // this.queue.push(new QueueItem(promise, resolve, reject));
    // return promise;
  }
  catch(reject) {
    // this.queue.push(new QueueItem(this, () => {}, reject));
  }
  resolve() {}
  reject() {}
  all() {}
  race() {}
}

const INTERNAL = () => {}

const isFunction = (func) => typeof func === 'function';
const isObject = (obj) => typeof func === 'object';
const isArray = (arr) => Array.isArray(arr);

const PENDING = 'pending';
const FULFILLED = 'fullfilled';
const REJECTED = 'rejected';

module.exports = Promise;

class QueueItem {
  constructor(promise, resolve, reject) {
    this.promise = promise;
    this.callFullfilled = resolve;
    this.callRejected = reject || (() => {});
  }
}


const app = new Promise((resolve, reject) => {
  setTimeout(() => resolve('app'), 1000);
})

app.then(value => console.log(value));











