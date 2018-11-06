# Node.js | 一点点补充

## module.exports | exports

```js
  // 在模块执行前
  exports = module.exports = {};
```

## window.onerror | prepareStackTrace

```js
  window.onerror = (message, scriptURI, line, column, errObject) => {
    return true || false; // true 则控制台不报错 
  }
  // node 环境下提前拿到 error 并改变 error 的信息
  function prepareStackTrace(err, stackArr) {}
  Error.prepareStackTrace = prepareStackTrace;
```

## Access-Control-Allow-Origin 字段

* 在html文件中，浏览器可以发起跨域请求，但 javascript 脚本不能获取请求资源的内容。

```js
  res.setHeader("Access-Control-Allow-Origin", "*");
```