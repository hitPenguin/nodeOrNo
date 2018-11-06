# Node.js | event 模块

```js
  events.EventEmitter() // 可以 new 也可以 继承
  const emit = new events.EventEmitter();
  class MyEmitter extends events.EventEmitter {}
  const emit = new MyEmitter();
  emit.on() // 等于 emit.addListener();
  /**
   * @添加监听器会触发： newListener
   * @移出监听器会触发： removeListener
   */
  emit.once() // 先触发 removeListener 后触发 事件本身
  emit.emit() // 按照绑定的顺序依次触发，彼此之间是同步的
```