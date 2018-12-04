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

3. `bash` | 进入 bash 子进程，不共享变量空间

4. `export value` | 使 value 变成环境变量，使 value 可以在子进程下使用
## 变量

### echo

```bash
  # echo $variable
  $ echo $PATH
  # ～/.bashrc 里面可以设置环境变量
```
### 变量设置规则

```bash
  myname=VBird # 两方不能有空格
  myname=VBird\ app # \ 可以转义 [ENTER], $, \, 空格, '
  myname="lang is $LANG" # 双引号中可以有变量
  myname='lang is $LANG' # 双引号中没有变量
  myname=$(uname -r) || `uname -r` # $() 或 ` ` 可以接命令
  PATH="$PATH":/home/bin || ${PATH}:/home/bin # 类似于字符串拼接
  unset myname # 解除变量名
  ls -ld `locate crontab` 
  ls -ld $(locate crontab) # ` ` 和 $() 都代表先被执行
```

### env | set

* `env` : 列出环境变量
```bash
HOME=/home/yy  # 用户的根目录
SHELL=/bin/bash  # 目前环境使用的 SHELL 是哪个程序
PATH=/usr/local/bin:/home/yy/ginnko/websocket:/usr/local/bin:/home/yy/ginnko/websocket:/home/yy/.nvm/versions/node/v8.11.4/bin:/home/yy/bin:/home/yy/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/bin:/home/yy/Desktop/wechat_web_devtools/bin:/home/yy/Desktop/wechat_web_devtools/bin:/home/yy/Desktop/wechat_web_devtools/bin  # 执行文件查找的路径
LANG=zh_CN.UTF-8  # 语系数据
HISTSIZE=  # 曾经执行的命令所记录的条数
MAIL=  # 使用 mail 命令所读取的邮箱文件
RANDOM=  # 随机数的变量
```
* `set` : 列出所有的变量(含 环境变量 和 自定义变量)

> * PS1 (提示字符的设置)
```bash
  # \d : 可显示日期 [Mon Febh 2]
  # \H : 完整的主机名
  。。。
```
> * $ | 代表本 shell 的进程号
> * ? | 代表上次命令执行后的代码，若正确则返回 0，错误则返回非 0

### locale | 显示支持的语系

### 变量有关

* shell 的 环境变量 的内存区域会被复制给 子进程 shell
* 变量和键盘相关
```
  read 命令:
    read [-pt] variable
      -p : 显示提示字符
      -t : 接等待的时间
    read -p "Please Enter your name:" -t 20 named
```
* declare 命令: typeset 命令 是一样的
```bash
  declare [-aixr] variable
    -a : 将 variable 定义为 数组
    -i : 将 variable 定义为 整数
    -x : 将 variable 定义为 环境变量
    -r : 将 variable 定义为 readonly 类型，不能改变 和 unset
  declare -i sum=100+300+50
  echo ${num} # 450
  declare +i variable # + 可以取消
```
* 数组的设置:
```bash
  var[index]=content
  # var[1]="small min"
```

### ulimit

```bash
  ulimit [-SHacdfltu] [配额]
    options:
      -H : 必定不能超过此值
      -S : 可以超过,会报警
      -a : 列出所有配额
      -c : 限制内核文件的最大容量
      -f : 此 shell 可以建立的最大文件容量
      -d : 程序可用的最大段内存 容量
      -l : 可用于 锁定(lock) 的内存量
      -t : 可使用的最大 cpu 时间
      -u : 单一使用者可用的最大进程数量
```

### alias | unalias

```bash
  alias [name='value'] # 设置或查看别名
  unalias name # 取消别名
```