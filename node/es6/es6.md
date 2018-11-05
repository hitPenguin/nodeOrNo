# ES6 | 补充

## Symbol | 原始类型

* symbol值由Symbol函数生成，是独一无二的

```js
  const symbol = Symbol('cat');
  symbol.toString // 'Symbol('cat')'
```

```js
  const mySymbol = Symbol();
  // obj.mySymbol形式错误
  obj[mySymbol] = 'app';
  //{
  //  [mySymbol]: 'app'
  //}
```

* symbol属性名的遍历

```js
  // 遍历所有symbol值
  Object.getOwnPropertySymbols(obj);
  // [Symbol('a'), Symbol('b')]
```

* Symbol 和 Symbol.for()

```js
  Symbol.for('cat') // 先查看是否存在，再决定新建还是获取
  Symbol('cat') // 创建新的变量
  Symbol.keyFor(symbol) // 获取登记的symbol的key值
```

## Generator函数

### Iterator对象

* 原生具有Iterator接口的：`Array` | `Map` | `Set` | `STRING` |  `TypedArray` | `arguments` | `NodeList`

```js
  // 具有 [Symbol.iterator] 方法即返回iterator对象
  const arr = [];
  const i = arr[Symbol.iterator]();
  i.next(); // { value: undefined, done: true }
  // 具有iterator接口就可以使用展开运算符(...)和for of循环
```

### yield

```js
  function* gen(x) {
    const y = yield x + 2;
    yield y;
  }
  const app = gen(2);
  app.next(); // { value: 4, done: false }
  app.next(2);// { value: 2, done: false }
```

### yield*

```js
  yield* gen(); // 相当于for of循环
```

### 异步任务

```js
  // 函数形式类似同步任务
  function* gen() {
    var url = 'http://localhost';
    var result = yield fetch(url);
    console.log(result.bio);
  }
  // 异步处理
  const g = gen();
  const result = g.next();
  result.value.then(function(data) {
    return data.json();
  }).then(function(data) {
    g.next(data);
  });
```