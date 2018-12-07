# 深入浅出 Node.js | 第十章

## 性能测试

### 基准测试

* 多种方法的速度测试
* 推荐 `benchmark` 模块
```js
  const Benchmark = require('benchmark');
  const suite = new Benchmark.Suite;
  const arr = [0, 1, 2, 3, 5, 6];
  const callback = (item) => item;
  suite.add('nativeMap', function () {
    arr.map(callback)
  }).add('customMap', function () {
    const ret = [];
    for (let i = 0; i < arr.length; i++) {
      ret.push(callback(arr[i]));
    }
    return ret;
  }).on('cycle', (event) => {
    console.log(String(event.target));
  }).on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  }).run();
  // logs
```

### 压力测试

### 代码覆盖率测试
