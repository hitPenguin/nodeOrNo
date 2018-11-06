# Node | buffer 模块

```js
  // 数组转 buffer
  const buffer = Buffer.from(array);
  buffer.toString(); // 转化为字符串
  buffer.toJSON(); // 转化为 { type: "buffer", data: [95, 93, ...] }
  // 推荐写法
  const bufArray = [];
  stream.on("data", (chunk) => {
    bufArray.push(chunk);
  });
  const buffer = Buffer.concat(bufArray);
```

## buffer 机制

* buffer 遵从 slab 分配
```js
  /**
   * @pool
   *  固定大小为 8kb
   *  有三个状态: full partical empty
   *  小于 8kb 的 buffer 对象按顺序放在 pool 里， 放不下再申请一个 8kb。
   *  大于 8kb 的 buffer 对象直接分配， 单独占有
   */
```