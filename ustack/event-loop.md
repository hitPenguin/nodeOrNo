# Event-Loop | 事件循环

## 六大阶段

1. Timer Phase 

* `setTimeout(() => {}, 0)` 实际为 `setTimeout(() => {}, 1)`
* 执行的是到时间的 `setTimeout()` 或者 `setInterval()` 的回调


2. Pending I/O Callback Phase
3. Idle, Prepare Phase | 内部阶段 不讨论
4. Poll Phase

* poll队列不为空的时候，事件循环肯定是先遍历队列并同步执行回调，直到队列清空或执行回调数达到系统上限
* poll队列为空的时候，这里有两种情况。
  1. 如果代码已经被setImmediate()设定了回调，那么事件循环直接结束poll阶段进入check阶段来执行check队列里的回调。
  2. 如果代码没有被设定setImmediate()设定回调： 
     1. 如果有被设定的timers，那么此时事件循环会检查timers，如果有一个或多个timers下限时间已经到达，那么事件循环将绕回timers阶段，并执行timers的有效回调队列。
     2. 如果没有被设定timers，这个时候事件循环是阻塞在poll阶段等待回调被加入poll队列。

5. Check Phase

* 专门执行 setImmediate() 的回调

6. Close Phase

* 专门处理一些 close 类型的回调， 用于资源清理
* 检测是否有活跃的 事件句柄, 没有则退出事件循环。

## promise | process.nextTick

* 属于 microtasks 相当于把代码贴在当前执行栈的结尾，用以区分回调的 macrotasks
* proces.nextTick 里的代码优先于 promise 中 resolve 或者 reject 的回调
* promise 中代码会执行完，但是状态具有唯一性