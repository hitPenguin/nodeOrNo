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