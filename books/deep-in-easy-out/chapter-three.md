# 深入浅出 Node.js | 第三章

* 异步 I/O 之所以流行，是因为在计算机资源中， I/O 与 cpu 计算是可以并行的。

## 备注

```
  (同步)异步 I/O 与 (非)阻塞 I/O 不能同等对待
  非阻塞 I/O 虽然可能同时处理多个流， 但是因轮询机制需要消耗更多的计算机资源
```

## 进程和线程的问题

* 进程有独立的磁盘空间，内存空间，I/O设备等
* 同一进程下的线程共享大部分内存空间
* 现代的操作系统基本上都是以 线程 为调度单位
* 上下文切换包括查找当前 进程/线程 的执行状态，内存空间等 | 理论上，进程的上下文切换消耗更大
* 进程/线程的休眠是把自己甩出调度队列，挂到等待队列，直到被唤醒

## 应用程序 执行 I/O 操作

1. 阻塞方式： 
```
  调用 open，write 等方法，若不可读，则进程/线程休眠，直到被唤醒
  阻塞 I/O 只能处理一个 I/O 流事件
```
2. 非阻塞方式： I/O 多路复用技术
```
  立即返回，进程/线程不会休眠，会重复查询(占用 cpu 资源)
  非阻塞 I/O 可以处理多个 I/O 流事件
  内核启动通知有 I/O 事件触发 | 会频繁 睡眠，唤醒
  select 最多同时检查 1024 个文件描述符
  poll 采用链表方式
  epoll 可以知道哪几个 I/O 事件触发了
```

## Node 的异步 I/O 机制

* 利用 线程池 模拟异步 I/O
* 部分线程进行 阻塞 I/O，再通过线程间通信完成异步回调
* 在 *nix 平台下，使用异步I/O库 libeio 和 libev 配合使用 | 在 windows 下是 IOCP 机制
* 双平台都是利用 线程池 和 阻塞 I/O 实现 异步 I/O，只不过 windows 是内核管理线程池
* 平台间兼容都是通过 抽象中间层 libuv 实现的。

## 请求对象

* javascript 调用 Node 核心模块，核心模块调用 C++ 的内建模块，内建模块通过 libuv 进行系统调用。
* uv_fs_open() 创建了 `FSReqWrap` 对象 | 相关回调放在 oncomplete_sym 属性上

## 非 I/O 的异步 API

* setTimeout, setInterval, setImmediate, process.nextTick
* setTimeout | setInterval
```
  setTimeout 和 setInterval 本质上都是会生成定时器对象，插入内部的一个红黑树中，在 Timer Phase 阶段取出查看是否过期
  setImmediate 是将函数放在 check 阶段
  process.nextTick 是将代码放在当前代码执行栈的最后 
  定时器红黑树操作 算法复杂度 O(lg(n)), process.nextTick 的时间复杂度是 O(1)
```