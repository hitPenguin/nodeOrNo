# 鸟哥的私房菜 | 第五章

## Linux 的文件权限与目录配置

### 使用者和群组

* User
* Group
* Others

* /etc/passwd 文件 | 系统上所有使用者的相关信息
* /etc/shadow 文件 | 个人的密码
* /etc/group 文件 | Linux 所有组名

* `ls -al` 指令
```js
  // drwxrwxr-x  3 chenqiang chenqiang  4096 8月  31 10:56 .vscode
  /**
   * @第一栏： 
   *  [d] 目录 | [-] 文件 | [l] 软链接
   *  [r] 读取 | [w] 写入 | [x] 可执行
   *  对于 目录 的权限：
   *  [r] 可读取目录结构列表 | [w] 可改动该目录结构列表 | [x] 用户可进入该目录成为工作目录
   * @第二栏：
   *  此节点(i-node)的链接数
   * @第三栏：
   *  文件的拥有者账号
   * @第四栏：
   *  文件所属群组
   * @第五栏：
   *  文件的容量大小 默认为 bytes
   * @第六栏：
   *  文档建档日期或者最近的修改时间
   * @第七栏：
   *  文件名，前头带 . 为隐藏文件。
```

* `chgrp` 改变文件所属群组 | `chown` 改变文件所有者 | `chmod` 改变文件权限
```bash
  # -R 是递归修改
  chgrp [-R] <group> <filename | dirname>
  chown [-R] username[: group] <filename | dirname>
  # r: 4 | w: 2 | x: 1
  chmod [-R] <xyz> <filename | dirname>
  # u , g , o , a | + , - , = | r , w , x
  # 权限设置不要加空格
  chmod u=rwx,g+r,o-x <filename | dirname>
```

### 文件种类

* 一般文件 [-]: 纯文本文件 | 二进制文件 | 数据格式文件 等
* 目录 `[d]`
* 软链接 `[l]`: 类似快捷方式
* 设备与装置文件:
1. 区块(block)设备档 `[b]`： 存储数据，以供系统随机存取的设备接口(软盘或硬盘) | 可以随机在不同的区块读写
2. 字符(character)设备文件 `[c]`: 串行端口的接口设备 | 一次性读取，不能截断输出
* 资料接口文件 `[s]`: 网络上数据的承接，客户端可以通过此 socket 进行数据的沟通
* 数据输送文件 `[p]`: 解决多个程序同时存取一个文件所造成的错误问题

### FHS 制定的四种目录特色

* shareable
* unshareable
* static
* variable

### 根目录 (/)

* `/bin` : 单人维护模式下还能被操作的命令
* `/boot` : 开机会用到的文件
* `/dev` : 设备文件
* `/etc` : 系统主要的配置文件
* `/lib` : 开机时用到的函数库， /bin 和 /sbin 底下的指令会呼叫的函数库
* `/media` : 可移除的装置
* `/mnt` : 暂时挂载某些额外的装置
* `/opt` : 第三方软件放置的目录
* `/run` : 系统开机所产生的各项信息
* `/sbin` : 开机过程所需要的指令， 只有 root 用户能用
* `/srv` : service 服务 (WWW, FTP)所需要取用的数据目录
* `/tmp` : 暂时放置文件的地方
* `/usr` :
* `/var` :
* `/lost+found` : ext 文件系统发生错误时将遗失的片段放入这里
* `/proc` : 虚拟文件系统，在内存中
* `/sys` : 虚拟文件系统，也不在硬盘中

### /usr 目录 | Unix Software Resource

* `/usr/bin` : 一般用户能够使用的指令
* `/usr/lib` : 与 /lib 基本功能相同
* `/usr/local` : 自己下载的软件建议安装至此目录
* `/usr/sbin` : 非系统正常运行所需要的系统指令

### /var 目录 | 主要针对常态性变动的文件

* `/var/cache` : 

## 目录树 (directory tree)

