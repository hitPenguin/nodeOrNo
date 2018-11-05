# Proxy

## 基本形式 

```js
  const proxy = new Proxy(target, handler);
```

## proxy 实例的方法

### get(target 目标对象, property 属性名 | . 后的属性名, Proxy实例本身 | . 前的对象)

* get 方法拦截属性的读取操作
* get() 方法可以继承 
```js
  const proxy = new Proxy({}, {
    get(target, property) {
      console.log(property);
    }
  });
  let obj = Object.create(proxy);
```

### set(target 目标对象， property 属性名， 属性值， receiver Proxy实例本身)

* set 拦截属性的赋值操作
* set 方法也可以继承
* 严格模式下 set 一定要返回 true

```js
  let validater = {
    set: function(target, key, value) {
      if(key === 'age') {
        throw new Error('not allowed!');
      }
      target[key] = value;
    }
  }
  let person = new Proxy({}, validater);
  let obj = Object.create(person);
  // obj.name = 'app' ===> {} 对象上有 name: 'app'
```

### apply(target 目标对象， ctx 目标对象上下文， args 目标对象的参数数组)

* apply 拦截函数的调用，call 和 apply 操作
```js
  const target = () => console.log('the target is here!');
  const handler = {
    apply() {
      console.log('the proxy is here!');
    }
  }
  const proxy = new Proxy(target, handler);
```

### has(target 目标对象， key 属性名)

* has 用来拦截 HasProperty 操作 | 对 for in 循环不生效 | 对 in 运算符生效
```js
  // prop in object
  const handler = {
    has(target, key) {
      if(key === 'name') {
        return false;
      }
      return key in target;
    }
  }
  const target = { name: 'app', age: 18 };
  const proxy = new Proxy(target, handler);
```

### construct(target 目标对象， args 构造函数的参数对象, newTarget 构造函数)

* construct 方法用于拦截 new 命令
* construct 方法必须返回一个对象
```js
  const handler = {
    construct(target, args) {
      return { name: "proxy" };
    }
  }
  // 不能用箭头函数 | 要写 function() {}
  const proxy = new Proxy(function () {}, handler);
```

## Proxy.revocable(target, handler) | 返回可撤销的 Proxy 实例

```js
  let { proxy, revoke } = Proxy.revocable({}, {});
  revoke();
```


# Reflect 对象上的方法和 Proxy 一一对应

## 静态方法

* `Reflect.apply(target, thisArgs, args);`
* `Reflect.construct(target, args);`
* `Reflect.get(target, name, receiver);`
```js
  Reflect.get(target, name, receiver);
  // 一般是 target 的 name
  // 若 属性 绑定了读取函数 (getter), 则 读取函数的 this 绑定 receiver
  // 第一个参数不为对象则报错
```
* `Reflect.set(target, name, value, receiver);`
```js
  Reflect.set(target, name, value, receiver);
  // 一般用法和 设置了 setter 函数的用法一样
  // 第一个参数不为对象则报错
```
* `Reflect.defineProperty(target, name, ddesc);`
* `Reflect.deleteProperty(target, name);`
* `Reflect.has(target, name);`
```js
  // 等同于： 'foo' in myObject
  Reflect.has(myObject, 'foo');
```
* `Reflect.ownKeys(target);`
* `Reflect.isExtensible(target);`
* `Reflect.preventExtensions(target);`
* `Reflect.getOwnPropertyDescriptor(target, name);`
* `Reflect.getPrototypeOf(target);`
* `Reflect.setPrototypeOf(target, prototype);`

# 利用 Proxy 和 Reflect 实现简单的代理者模式

```js
  const person = observable({
    name: "张三",
    age: 20
  });

  function print() {
    console.log(`${person.name}, ${person.age}`);
  }

  observe(print);

  person.name = '李四';
  // 输出
  // 李四， 20
```

```js
  // 利用代理 Proxy 检测 set 方法并且利用 Reflect.set()来返回原本的对象
  const queuedObservers = new Set();
  const observe = fn => queuedObservers.add(fn);
  const observable = obj => new Proxy(obj, {set});
  function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
  }
```