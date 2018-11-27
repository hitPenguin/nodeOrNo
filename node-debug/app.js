// 模拟实现 promise 原理

/**
 * 处理 resolver 函数 | safelyResolveThen
 * @param {Object} self promise 实例 
 * @param {Function} then 构造 promise 实例的参数 for example: function (reject, resolve) {}
 * @return {Function} to do doResolve or doReject
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
        return ;
      }
      called = true;
      doReject(self, error);
    });
  } catch (error) {
    if (called) {
      return ;
    }
    called = true;
    doReject(self, error);
  }
}
/**
 * promise 内部调用 resolve
 * @param {Promise} self 
 * @param {*} value 
 */
function doResolve(self, value) {
  try {
    const then = getThen(value);
    if (then) {
      safelyResolveThen(self, then);
    } else {
      self.state = FULFILLED;
      self.value = value;
      self.queue.forEach(function (queueItem) {
        queueItem.callFulfilled(value);
      });
    }
    return self;
  } catch (error) {
    return doReject(self, error);
  }
}
/**
 * promise 内部调用 reject 或 throw error
 * @param {Promise} self 
 * @param {Object} error 
 */
function doReject(self, error) {
  self.state = REJECTED;
  self.value = error;
  self.queue.forEach(function (queueItem) {
    queueItem.callRejected(error);
  })
  return self;
}

function getThen (promise) {
  const then = promise && promise.then;
  if (promise && (isObject(promise) || isFunction(promise)) && isFunction(then)) {
    return function applyThen () {
      then.apply(promise, arguments);
    }
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
  then(onFulfilled, onRejected) {
    if ((!isFunction(onFulfilled) && this.state === FULFILLED) || (!isFunction(onRejected) && this.state === REJECTED)) {
      return this;
    }
    const promise = new this.constructor(INTERNAL);
    if (this.state !== PENDING) {
      const resolver = this.state === FULFILLED ? onFulfilled : onRejected;
      unwrap(promise, resolver, this.value);
    } else {
      this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    }
    return promise;
  }
  catch(onRejected) {
    return this.then(null, onRejected);
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
  constructor(promise, onFulfilled, onRejected) {
    this.promise = promise;
    this.callFulfilled = function (value) {
      doResolve(this.promise, value);
    };
    this.callRejected = function (error) {
      doReject(this.promise, error);
    }
    if (isFunction(onFulfilled)) {
      this.callFulfilled = function (value) {
        unwrap(this.promise, onFulfilled, value);
      };
    }
    if (isFunction(Onrejected)) {
      this.callRejected = function (error) {
        unwrap(this.promise, onReject, error);
      };
    }
  }
}

function unwrap (promise, func, value) {
  process.nextTick(function () {
    let returnValue;
    try {
      returnValue = func(value);
    } catch (error) {
      return doReject(promise, error);
    }
    if (returnValue === promise) {
      doReject(promise, newTypeError('Cannot resolve promise with itself'));
    } else {
      doResolve(promise, returnValue);
    }
  })
}

const promise = new Promise(function(resolve, rejecte) {
  resolve('app');
})

promise.then(() => {
  promise.then(() => {
    console.log('1')
  })
  console.log('2');
})












