# 鸟哥的私房菜 | 第六章

## 目录的相关操作

```bash
  cd . # 代表此层目录
  cd .. # 代表上一层目录
  cd - # 代表前一个工作目录
  cd ~ # 目前使用者的家目录
  cd ~username # 同上
```

### cd 命令 | change directory

* linux 的默认命令行模式有文件补齐功能 | `Tab`

### pwd 命令 | Print Working Directory

* `pwd` 显示当前目录
* `pwd -P` 显示真实路径，而非软连接

### mkdir | make directory

* `mkdir -p` 循环创建多层目录
* `mkdir -m 741` 设置目录的默认权限

### rmdir | 删除 '空' 的目录








 
### $PATH 

* `echo $PATH` | 查看环境变量
```
  /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```
* `PATH="${PATH}:/root"` | 添加环境变量
1. 不同身份默认的 PATH 不同
2. PATH 可以修改
3. 本目录(.)不要放到 PATH 当中

## 目录管理命令

### ls 命令

1. `ls -a` | 查看隐藏文件(., ..)
2. `ls -l` | 文件或目录的详细信息 | `ll`
3. `ls -i` | 查看文件的 inode
 
### cp 命令

1. `cp 源文件 目标文件` | 复制文件
2. `cp -i` | 若目标文件存在，可提前询问
3. `cp -s` | 软连接的建立
4. `cp -a` | `cp -p` | 连同 文件权限 用户 创建时间一起复制

### rm 命令

1. `rm -i` | 删除前询问
2. `rm -r` | 递归删除

### mv 命令

### basename | dirname

```bash
  base /etc/sysconfig/network # echo network
  dirname /etc/sysconfig/network # echo /etc/sysconfig
```

查看文件命令 | 功能
--- | ---
cat | 从第一行开始显示
tac | 从最后一行开始显示
nl | 显示内容和行号
more | 一页一页的显示文件内容
less | 同上，可以往前翻页
head | 只看前面几行
tail | 只看后面几行
od | 以二进制的方式读取文件

* cat 命令
```js
  /**
   * @ -b: 非空白行显示行号
   * @ -n: 连同空白行都有行号
   * @ -A: 可显示特殊字符
   */
``` 
* more/less 命令
1. more
```
  space: 向下翻页
  Enter: 向下翻一行
  /字符串: 在显示的内容中向下查找字符串
  :f  立刻显示文件名和目前显示的行号
  q: 代表离开
  b 或者 ctrl + b: 往回翻页，对文件有用，对管道无用
```
2. less
```
  space: 同上
  [pagedown]: 向下翻一页
  [pageup]: 向上翻一页
  /字符串: 向下查找字符串
  ?字符串: 向上查找字符串
  n: 重复前一个查找
  N: 反向重复前一个查找
  g: 前进到第一行
  G: 前进到最后一场
  q: 离开
```

### 数据截取

* `head -n` | 截取前 n 行 | n 为负数则为不包括后 n 行
* `tail -n` | 截取后 n 行 | n 为负数则为不包括前 n 行

### 非纯文本文件 | od 命令

* `od -t` | c 使用 asc字符来输出

## touch 命令

1. mtime 修改时间: 记录文件的内容改变时间 | `ls` 默认显示的时间
2. ctime 状态时间: 文件的状态，例如权限和属性被更改则更新
3. atime 读取时间: 文件被最近一次读取的时间

* `touch` 常用用法 | 创建空文件 | 将某个文件日期自定义为目前(mtime 与 atime)


### 命令常用

1. `umask (-S)` | 显示默认的权限
```bash
    usmask # 0002
    usmask -S # u=rwx,g=rwx,o=rx
    usmask 002 # 设置默认权限值
    # 文件默认权限 -rw-rw-rw- 
    # 目录默认权限 drwxrwxrwx
    # umask 为拿掉的权限
```
2. 文件的隐藏属性 | `chattr [+-=] [ASacdistu]　filename/dirname`
```bash
  # 重要的参数 | root 可以修改
  # +i 使文件保持不能被改变 增删改查，改名，设置链接都不行
  # +a 文本只能增加，不能删除和修改
  lsattr [-adR] filename/dirname
  # -a 显示隐藏文件
  # -d 只显示本身\
  # -R 全部显示
```
3. 文件的特殊权限 
```bash
  ls -ld /tmp
  # drwxrwxrwt 18 root root 28672 11月 26 14:51 /tmp
  ls -l /usr/bin/passwd
  # -rwsr-xr-x 1 root root 59640 1月  25  2018 /usr/bin/passwd
```
* s | Set UID | 代替文件拥有者 x 位置
```
  1. SUID 仅对二进制程序有效
  2. 执行者需要对该程序有 x 的可执行权限
  3. 本权限仅在执行该程序的过程中有效
  4. 执行者将具有该程序拥有者的权限
  举个例子
  ls -l /usr/bin/passwd
  # -rwsr-xr-x 1 root root 59640 1月  25  2018 /usr/bin/passwd
  因为 others 有 x 权限, 所以使用 passwd 命令时可以变成 passwd 的主人 root
```
* s | Set GID | 代替用户组的 x 位置
```
  针对二进制程序
  1. SGID 对二进制程序有用
  2. 同样需要 x 的权限
  3. 程序执行时临时获得该程序用户组的支持
  针对目录
  1. 用户对此目录有 r 和 x 的权限，该用户能够进入此目录
  2. 用户在此目录下的有效用户组会变成该目录的用户组
  3. 用途：若用户有 w 权限，则用户建立的新文件，该文件的用户组与此目录的用户组相同。
```
* t | Sticky Bit | 只针对目录
```
  ls -ld /tmp
  # drwxrwxrwt 18 root root 28672 11月 26 14:51 /tmp
  若 A 用户对目录具有 w 的权限，且有 t 权限，则 A 只能针对自己建立的文件和目录进行操作 
  root 啥都能干
```
* 文件的特殊权限的设置
```bash
  # 4: SUID | 2: SGID | 1: SBIT
  chmod 4777 test
  # SUID: u + s | SGID: g + s | SBIT: o + t
```

### 文件的属性和查找

1. `file filename/dirname` | 查看属性
2. `which [-a] command` | 查看命令的所在目录 | -a 找所有
3. `whereis [-bmsu] file/dirname`
```bash
  # -l 列出要查询的几个主要目录
  # -b 只找二进制格式的文件
  # -m 只找在说明文件 manual 路径下的文件
  # -s 只找 source 源文件
  # -u 查找不在上述三个项目当中的其他特殊文件
  whereis -l
  # 列出 whereis 查找的特定目录
```
4. `locate [-ir] keyword`
```bash
  # -i 忽略大小写
  # -c 输出找到的数量
  # -l 仅输出几行: -l 5
  # -S 列出用于查找的相关数据库信息
  # -r 后面可以接正则式
  updatedb # 更新文件索引数据库
```
5. `find [PATH] [option] [action]`
```
  时间参数:
    0 代表当天
    1. -mtime n: 列出在 n 天之前的 [一天之内] 被修改过内容的文件。
    2. -mtime +n: 列出在 n 天之前(不含 n 天本身)被修改过内容的文件
    3. -mtime -n: 列出在 n 天之内(含 n 天本身)被修改过内容的文件
    4. -newer file: 列出比 file 还要新的文件
  user 或 group 的参数：
    1. -uid n: UID 记录在 /etc/passwd
    2. -gid n: GID 记录在 /etc/group
    3. -user name: 使用者的账号名称
    4. -group name: 用户组名称
    5. -nouser: 不在上述文件中
    6. -nogroup: 不在上述文件中
  文件权限 和 名称 的参数:
    1. -name filename: 查找 filename | find / -name '*passwd *'
    2. -size [+-] SIZE: 查找比 size 还要大的文件, c 代表字节, k 代表千字节
    3. -type TYPE: 文件类型 一般文件(f), 设备文件(b, c), 目录(d), 链接文件(l), socket(s), FIFO(p)
    4. -perm mode: 查找文件权限刚好等于 mode 的文件
    5. -perm -mode: 查找文件权限 必须要全部囊括 mode 的权限的文件 | 查找到的是 mode 的父集
    6. -perm /mode: 查找文件权限 包含任一 mode 的权限的文件 | 查找到的是 mode 的子集
  其他操作:
    1. -exec command | command 为其他命令，用于处理找到的结果
      -exec ls -l {} \;
      # 命令以 -exec 开始，以 \; 结束
      # {} 代表 find 命令的结果
      # \; 代表不和 bash 中的 ; 冲突，是转义字符
    2. -print 默认操作，将结果打印到屏幕
```