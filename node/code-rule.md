# Node编码规范

## 空格与格式

1. `缩进` | 采取双空格缩进
2. `变量声明` | 每行都要有个var
3. `空格` | 操作符和小括号前后都应存在空格
```js
  var foo = 'bar' + baz;
  if (true) {
    // some code
  }
``` 
4. `单双引号` | 尽量使用单引号，JSON字符串要用双银海
5. `大括号` | 一般情况下，无需另起一行
```js
  if (true) {
    // some code
  }
```

## 命名规范

1. `变量命名` | 小驼峰 `adminUser`
2. `方法命名` | 小驼峰且动词或判断性词汇 
```js
  var getUser = function () {};
  var isAdmin = function () {};
```
3. `类命名` | Class `User` {}
4. `常量命名` | 所有单词大写，下划线分割
```js
  var PINK_COLOR = 'pink';
```
5. `文件命名` | 尽量用下划线分割 `child_process.js`
6. `包名` | 尽量简短且有意义 
```js
  var express = require('express');
```

## 比较操作

* 进行判断时尽量使用`===`， `！foo`， `！==`

## 字面量

* 尽量使用`{}`， `[]`，不要使用包装类
  
## 作用域

1. `慎用with` 
```js
  // 结果可能为obj.foo = obj.bar; | obj.foo = bar; | foo = bar; | foo = obj.bar;
  with(obj) {
    foo = bar;
  }
```
2. `慎用eval`

# 数组与对象

1. `字面量格式` 
```js
  var foo = ['hello', 'world'];
  var bar = {
    hello: 'world',
    pretty: 'code'
  }
```
2. `for in循环` | 不对数组使用
3. `不把数组当对象`

## 异步

1. 异步回调`首参`为`错误提示`
2. 回调传入一定要执行

## 类和模块

* `导出`
```js
  module.exports = Class;
```

## 注解规范

* `dox的推荐注释` | 源自JSDoc

## 最佳实践

1. `给编辑器设置检测工具` | `JSLint`， `JSHint`
2. `SVN` 或者 `Git` | `precommit` 钩子脚本
  