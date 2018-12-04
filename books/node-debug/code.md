# Node.js | 第三章 代码

## promise 内部实现原理

```js
  // 先稍微记忆下 构造函数 new 和 class
  var A = function() {}
  var a = new A();
  A.prototype === a.__proto__; // true
  console.log(A.prototype); 
  /**
   *  {
   *    constructor: a,
   *    __proto__: Object.prototype
   *  }
   */
  class A {} // 此 a 其实就是上面的 a 
  // class 中的方法被赋予到 a.prototype 上
```



## Error Stack

### Error 内置的　类型

1. Error: 通用的错误类
2. SyntaxError: 语法错误
3. ReferenceError: 引用错误
4. TypeError: 类型错误
5. URIError: 全局的 URI 处理函数时抛出的错误
6. AssertError: 使用 assert 模块时抛出的错误
```js
  // error 对象
  {
    name: 'ReferenceError',
    message: 'v is not defined',
    constructor: '',
    stack: `SyntaxError: error err\n    at Object.<anonymous> (/home/yy/Desktop/hitPenguin/gitbook/node-debug/index.js:2:9)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)\n    at Function.Module.runMain (module.js:693:10)\n    at startup (bootstrap_node.js:191:16)\n    at bootstrap_node.js:612:3`
  }
```

* Stack Trace: 函数的栈式调用
```js
  console.trace(); // 当前函数的调用栈
  /**
   * 函数调用时放入栈顶
   * 函数执行完从栈顶移除
   */
```
1. `Error.captureStackTrace(targetObj[, constructorOpt])`
```js
  /**
   * @param {Object} 给 targetObj 添加 stack 属性, 是本方法的调用栈位置
   * @param {Function} 移除 给定函数(包括其本身) 到栈顶的函数栈
   */
```
2. `Error.prepareStackTrace(error, structuredStackTrace)`: 定制　stack