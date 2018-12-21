# 软件安装

* 查看文件是否为 二进制文件
```bash
  # file filename
  file /bin/bash
  # ELF 64-bit LSB shared object
  file /home/yy/.nvm/versions/node/v8.11.4/lib/node_modules/npm/bin/npm-cli.js
  # UTF-8 Unicode text executable
```

## 函数库

* 类似子程序，是可以被调用来执行的一段功能函数
```
  静态函数库:
    通常名称为: libxxx.a
    函数库直接被整合到 链接后的可执行程序 里
  动态函数库:
    通常名称为: libxxx.so
    链接时可执行程序只有指针，具体的函数要去库文件里面找 即 动态加载
    前提是链接时和执行时的文件名称和路径要相同
  绝大多数函数库放在 /lib 或 /lib64 中
  系统内核提供的函数库放在 /lib/modules
```

## configure 和 make

```
  大致流程:
    configure 检测程序的完整性，并生成 makefile 文件
    make 命令会主动找到 makefile 文件并进行编译
    生成可执行的二进制文件
```

* 因为源代码就是写满了代码的纯文本文件，因此一般会先用 tar 打包，然后用 gzip (目前更流行 bzip2 和 xz)
```
  Tarball 是 软件包, 大致包含:
    源代码文件
    检测程序文件(configure 或 config 等文件)
    本软件的建议说明与安装说明(INSTALL 或 README)
```

* 编译型语言一般要先通过 编译 链接 成 二进制文件
```
  过程:
    1. 预处理 把 #include 的头文件和宏定义换成真正的内容:
      gcc -E hello.c -o hello.i
    2. 编译 把文本文件换成汇编程序：
      gcc -S hello.c -o hello.s
    3. 汇编 把汇编程序变成二进制文件:(生成目标文件)
      gcc -c hello.c -o hello.o\
    4. 链接 把单独的程序文件链接起来
      gcc -o hello hello.o hello_2.o
    链接的目的是如果更改了某一个文件，只对单个文件进行重新编译就可以了
```

* gcc 的玩法
```
  gcc : 
    -l : 加入某个函数库
    m : 加入 libm.so 这个函数库 // math.h 数学计算函数实际此库
    -L/path:  查找函数库的目录路径
    -I/path: 查找头文件的目录路径
    -O: 执行速度最快
  小细节:
    gcc 对于 main.h 的文件， 如果 sqrt(a) 则需要在链接阶段手动加入 -lm, sqrt(5) 就不需要
    sqrt(a) 在汇编阶段会有 call sqrt 因此需要 -lm， 而 sqrt(5) 则没有，也就不需要 -lm
```
* makefile 基本规则:
```makefile
  # 井号 可以用来注释
  目标(target): 目标文件1 目标文件2
  <tab> gcc -o 欲建立的执行文件 目标文件1 目标文件2
```

```makefile
# main: main.o haha.o sin_value.o cos_value.o
# 	gcc -o main main.o haha.o sin_value.o cos_value.o -lm
# clean:
#   rm -f main main.o haha.o sin_value.o cos_value.o 
# 进行简化
LIBS = -lm
OBJS = main.o haha.o sin_value.o cos_value.o
CFLAGS = -Wall # make 会主动读取 CFLAGS 环境变量
# $@ 代表当前的 target 目标
main: ${OBJS}
	gcc -o $@ ${OBJS} ${LIBS}
clean:
  rm -f main ${OBJS} 
```
```bash
  make clean main
  # 先执行 clean，再执行 main
```
```
  make 环境变量使用规则:
    1. make 命令行后加上的环境变量
    2. makefile 里面指定的环境变量
    3. shell 原本具有的环境变量
```