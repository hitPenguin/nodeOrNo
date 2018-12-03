# 鸟哥的私房菜 | 第十章

* shell 泛指 壳 程序，是可以输入命令和操作系统内核命令进行交互的程序
* bash 是 shell 的一种
```bash
  $ cat /etc/shells
  # /bin/sh
  # /bin/dash
  # /bin/bash
  # /bin/rbash
  # /bin/zsh
  # /usr/bin/zsh
```

## 进入正题

* `history`
```
  history 查看用过的命令
  /home/yy/.bash_history 上次登录所使用的命令
```
* `tab` 用来补全命令和文件路径
* `alias` | 用来设置或查看命令的别名 | `alias lm='ls -al'`
*  shell scripts | 脚本批处理
* wildcard | 通配符 *

## 命令学习

1. `type` | 查看命令是否是 shell 内置
```bash
  type [-tpa] name
  # -t : file || alias || builtin
  # -p : 外部命令才显示完整的文件名
  # -a : 在 PATH 变量内的所有同名命令都列出
```
2. 快捷键
```bash
  # 命令太长用 \[ENTER] 转行
  # ctrl + u / ctrl + k | 向前， 向后删除命令串
  # ctrl + a / ctrl + e | 光标移动到最前， 最后
```