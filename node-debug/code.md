# Node.js | 第三章 代码

## promise 内部实现原理

```js
  // 先稍微记忆下 构造函数 new 和 class
  var a = function() {}
  var b = new b();
  a.prototype === b.__proto__; // true
  console.log(a.prototype); 
  /**
   *  {
   *    constructor: a,
   *    __proto__: Object.prototype
   *  }
   */
  class a {} // 此 a 其实就是上面的 a 
  // class 中的方法被赋予到 a.prototype 上
```