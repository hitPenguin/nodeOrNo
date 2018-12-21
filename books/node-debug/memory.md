# node 调试 | 内存篇

## gcore 和 llnode

* `core` 文件，准确的说是 `core dump` 文件
* `gcore [-o filename] pid` 用于不重启程序就在执行目录生成 code.<pid> 文件

## 闭包

```js
  /**
   * 闭包导致的内存泄露
   * 1. 父函数的子函数引用了父函数的变量
   * 2. 函数内部的函数被 return 出来
   * 每个函数都有唯一的内部闭包作用域，每个闭包都会给闭包作用域添加变量
   * 若有 return 的子函数，则其内部闭包作用域不会被释放 
   */
```

## heapdump

```
  chrome devtools: memory / heap snapshot
    (value):
      (array) , (string) , (regexp) 分别代表内置的 Array , String , Regexp
      (boolean) , (number) , (string) ...
      (closure) 闭包
    Distance:
      到 GC roots 的距离。 window || global
    Objects Count:
      对象的个数
    Shallow Size:
      对象自身的大小
    Retained Size:
      对象自身的大小和它引用对象的大小
```

## cpu-profile

* 利用 V8 自带的 V8-profile
```bash
  node --prof app # 利用 node 自带的性能分析工具 Tick Processor， 记录代码的堆栈信息
  node --prof-process isolate-0x103000000-v8.log > processed.txt 
  # 查看 processed.txt 文件
```

```
  profile 文件解析:
    大致记录了代码在 javascript ， c++ 等的消耗时间和堆栈信息  
```

## 错误栈的优化 

* 错误发生在异步回调中，会丢失回调前的错误栈信息 | 考虑用异步钩子 async_hooks
* 错误栈的优化 | 待定

## 日志

待定