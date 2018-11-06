# User space 和 Kernel space

## User space | 用户程序的运行空间

* 只能进行简单的运算 和 调用系统接口

## Kernel space | Linux 内核的运行空间

## top 命令
```js
  // 第三行
  %Cpu(s):  6.2 us,  3.6 sy,  0.0 ni, 89.9 id,  0.3 wa,  0.0 hi,  0.1 si,  0.0 st
  /**
   * @ us: user, CPU 消耗在 User space 的时间百分比
   * @ sy: system, CPU 消耗在 Kernel space 的时间百分比
   * @ ni: niceness, CPU 消耗在 nice 进程(低优先级)的时间百分比
   * @ id: idle, CPU 消耗在 闲置进程 的时间百分比, 值越低 CPU 越忙
   * @ wa: wait， CPU 等待外部 I/O 的时间百分比
   * @ hi: hardware interrupt, CPU 响应硬件中断请求的时间百分比
   * @ si: software interrupt, CPU 响应软件中断请求的时间百分比
   * @ st: stole time, 该项指标只对虚拟机有效，表示分配给当前虚拟机的 CPU 时间之中，被同一台物理机上的其他虚拟机偷走的时间百分比
   */
```

## time 命令

* 正常启动命令前 + time | `time npm run dev`
```js
  /**
   * @ real: 程序从开始运行到结束的全部时间
   * @ user: 程序在 User space 执行的时间
   * @ sys: 程序在 Kernel space 执行的时间
   * @ 多核 CPU: sys + user 可能大于 real
   */
```