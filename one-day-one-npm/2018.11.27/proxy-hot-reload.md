# proxy-hot-reload

```
  每个 js 文件都是 Module 的实例
  require.cache 不管在哪里,都是目前已经加载的 module 文件的实例化
  require(path) ---> 若有缓存找缓存，无缓存则执行 Module.prototype._compile 并生成缓存
```

```js
  /**
   * opts
   * @param {Array:String} includeFiles 包括的文件列表
   * @param {Array:String} excludeFiles 排除的文件列表
   * @param {String} includes global.sync 参数 默认为 **\/*.js
   * @param {String} excludes global.sync 参数 **\/node_modules/**
   */
```

1. 利用 `chokidar` 包监视所选文件列表
```js
  {
    usePolling: true
  }
  fs.watch(file).on('change', (path) => {
    delete require.cache[path]
    require(path)
  })
```
2. 利用 `shimmer` 包包装 `Module.prototype._compile` 方法
```js
  // 文件第一次加载时 模块的 exports 直接被包装为 Proxy 对象
  /**
   * 第一次加载文件时
   * this._exports = {} 初始值
   * this.exports = new Proxy(this._exports, ...);
   * 每次先删掉 require.cache[path], 再 require(path) 调用 Module.prototype._compile 把最新值加载到 this._exports;
   * 让 exports 的值 判断 require.cache[filename] 取得 最新的 ._exports
   */
  shimmer.wrap(Module.prototype, '_compile', function (__compile) {
  return function proxyHotReloadCompile(content, filename) {
    const result = __compile.call(this, content, filename)
    this._exports = this.exports
    this.exports = new Proxy(this._exports, {
      get: function (target, key, receiver) {
        if (require.cache[filename]) {
          return require.cache[filename]._exports[key]
        } else {
          return Reflect.get(target, key, receiver)
        }
      }
    })
    return result;
  }
})
```