# 深入浅出 Node.js | 第四章

## 函数式编程

### 高阶函数

```js
  function foo() {
    return function (x) {
      return x;
    }
  }
  const bar = foo()(5);
  function foo(x, bar) {
    return bar(x);
  }
  const bar = foo(5, (x) => x);
```

### 偏函数 | 基于高级函数传递部分参数而生成不同的函数 | 函数工厂

```js
  const isType = function (type) {
    return function (obj) {
      return toString.call(obj) == `[object ${type}]`;
    }
  }
  const isString = isType('String');
  const isFunction = isType('Function');
```

##  异步编程的解决方案

1. 事件发布/订阅模式
```js
  proxy.on('event', callback);
  proxy.emit('event', message);
  // 偏函数版本的 多异步任务处理
  const after = (times, callback) => {
    let count = 0;
    const results = {};
    return (key, value) => {
      results[key] = value;
      count ++;
      if (count === times) {
        callback(results);
      }
    }
  }
  new events.Emitter().on('done', after(3, callback));
  fs.read...(path, (err, template) => {
    emitter.emit('done', 'template', template);
  })
  fs. ... // 同上两次
  function callback(result) {
    // 处理 result
  }
```
