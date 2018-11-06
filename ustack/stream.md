# Node.js | stream 模块

## process.stdin | process.stdout

* process.stdin | process.stdout 为可读可写流
* 若指向文件, process.stdin 为可读流， process.stdout 为可写流

## stream.read()

* stream 的缓冲机制
```js
  /**
   * @ push 方法
   *  把数据从缓冲区读入自己的缓存
   *  调用 pull(null) 标志结束
   * @ read 方法
   *  把数据从缓存中读入 buffer 当中
   */
```
* ObjectMode 的设置
```js
  /**
   * @ ObjectMode 模式
   *  可以 push 任意类型的数据， 消耗时会逐个消耗同样的数据
   * @非 ObjectMode 模式
   *  只能 push 四种数据类型: string buffer null undefined， 消耗时只能拿到 buffer 类型的数据
   */
```