# V8 垃圾回收机制

## V8 内存限制 及 原因

* 64 位机大约为 1.4g | 32 位机大约为 0.7g
* `process.memoryUsage()`
```js
  process.memoryUsage() 
  /**
   * { rss: 29888512  所有的内存占用 resident set size
   *   heapTotal: 7684096  堆所申请的内存
   *   heapUsed: 4971456  堆已用的内存
   *   external: 9342  V8 引擎内部的 C++ 对象占用的内存
   */
```
* 内存越大，垃圾回收所用时间越长，影响性能

## 启动参数 | 改变内存限制

```bash
  node --max-old-space-size=1700 test.js # 单位 mb
  # 或
  node --max-new-space-size=1024 test.js # 单位 kb
```

## V8 垃圾回收机制

* 新生代对象 Scavenge Cheney | 64 位 32mb | 32 位 16mb
* 全停顿 | stop-the-world
```js
  /**
   * @分为 From 和 To 两个等大的空间
   * @垃圾回收时， 检测对象是否复制过一次 和 To 空间占比是否超过 25%， 超过会晋升至 老生代
   * @From 和 To 空间角色互换
   */
```
* 老生代 Mark-Sweep Mark-compact | 64 位 1400mb | 32 位 700mb
* 增量标记 | 交替执行
```js
  /**
   * @Mark-Sweep
   *  标记阶段 标记活的对象
   *  清除阶段 清除未标记对象
   * @Mark-Compact
   *  整理过程中， 将活着的对象向一边移动
   */
```

```js
  const os = require('os');
  os.totalmem(); // 系统总内存
  os.freemem(); // 系统可用内存
```