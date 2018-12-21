# 进程管理和 SELinux 初探

* linux 的程序调用:
```
  fork - and - exec
  父进程 : PID = X ; 程序名 = zzz;
  FORK 操作
  临时子进程 : PPID = X ; PID = Y ; 程序名 = zzz；
  EXEC qqq
  最终子进程 : PPID = X ; PID = Y ; 程序名 = qqq;
```

```bash
  # & 可以使 单个bash 执行 多任务
  $ cp file1 file2 &
```

## /bin/bash 

```
  每个进程都有自己的权限，我们所执行的各项任务都是经过某个 pid 来执行的
```

```bash
  ps -lA
  ps aux # 查看系统的所有进程
  ps -l # 仅查看自己的 bash 相关进程，即进程的最顶级父进程就是当前 bash
  # F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
  # 0 S  1000 14359 14348  1  80   0 -  6957 wait   pts/0    00:00:00 bash

```

bash 参数 | 意义
-- | --
F | 代表进程权限: 4 权限为 root, 1 代表此进程仅 fork 未 exec
S | 进程状态: R 运行, S 睡眠但可被唤醒(signal), D 不可被唤醒的睡眠(可能是等待 I/O), T 停止状态(可能在后台暂停), Z 僵尸状态
UID/PID/PPID | 代表此进程的用户 id，进程 id，父进程 id
C | CPU 使用率
PRI/NI | 此进程的优先级，数值越小越先被执行
ADDR/SZ/WCHAN | SZ 代表此进程用掉多少内存， WCHAN 表示进程是否在执行
TTY | 登陆者的终端位置
TIME | 此进程实际花费 cpu 的运行时间
CMD | 此进程的触发命令

```bash
  pstree # 查看进程树
  # 僵尸进程: 一般指程序即将截止但父进程没办法杀掉该进程，进程一直存在内存里
  # CMD 后面接着 <defunct> 表示该进程是 僵尸进程
```

* `top` 动态查看 进程 状态
 mmnnnnnnnnnnnnnnnnn
```bash
  top [-d 数字] | top [-bnp]
  # -d: 后接秒数 进程界面的刷新时间 默认5s
  # -p: pid1, pid2, ... 指定某些 pid 来完成检测 
```
```
  top 界面的具体信息:

```

* `pstree` 查看进程树 | `systemd` pid 1

```bash
  pstree [-A|U] [-up]
  # -A: 各进程树之间以 ASCII | Unicode 字符来链接
  # -p: 并同时列出 pid 
  # -u: 并同时列出 所属账号
```