# Node.js | stream 模块

## 流就是一系列的数据

* Readable (可读流)
* Writable (可写流)
* Duplex (双工流)
* Transform (变形金刚流)

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

## 实现一个流

* Writable
```
  write 函数的参数:
    > chunk: 通常是 Buffer
    > encoding: 编码格式
    > callback: 写完数据后需要调用一下的回调函数
  可写流的消费只需 readable.pipe(writable)
```
```js
  const { Writable } = require('stream');
  const outStream = new Writable({
    write(chunk, encoding, callback) {
      console.log(chunk.toString());
      callback();
    }
  });
  process.stdin.pipe(outStream);
```
* Readable
```js
  readable.push(data); // 向可读流里写入数据
  readable.push(null); // 告知可读流，数据已结束
```
```js
  const { Readable } = require('stream'); 
  const inStream = new Readable({
    read(size) {
      this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null);
      }
    }
  });
  inStream.currentCharCode = 65;
  inStream.pipe(process.stdout);
```

