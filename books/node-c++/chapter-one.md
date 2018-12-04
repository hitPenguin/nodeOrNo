# node c++ 拓展 | 前驱知识储备

## node.js 依赖简介

### chrome V8

1. 高效:
```
  1. JIT 编译:
    just in time, 即时编译。
  2. 垃圾回收:
    借鉴了 Java VM 的精确垃圾回收机制
  3. 内联缓存(Inline Cache):
    例如: this.name 第一次要对哈希表取址，会缓存其偏移量
  4. 隐藏类:
    类似 Object.prototype 作为大多数对象的原型
```
2. 遵循 ECMAScript
3. Node.js 也在紧跟 V8 的步伐

### libuv

* Node.js 目前就是利用的 libuv 的默认事件循环

### 其他依赖

1. http-parser
```
  用 c 语言编写的第三方库
```
2. OpenSSL
```
  主要用 c 语言编写，实现了基本的加密功能: SSL 和 TLS
```
3. zlib
```
  一套数据压缩，解压库
```

### node-gyp | Node.js 的 C ++ 拓展工具

* node-gyp 命令
```bash
  node-gyp build # 调用 make 构建模块
  node-gyp clean # 清理生成的构建文件以及 out 目录
  node-gyp configure # 给当前模块生成一个 makefile
  node-gyp rebuild # 同时运行 clean configure build
  node-gyp install # 为指定版本的 Node.js 安装开发环境的文件
  node-gyp list # 输出当前安装的 Node.js 开发环境的文件
  node-gyp remove # 移除指定版本的 Node.js 开发环境文件
```

1. `node-gyp install`
```bash
  # 安装在 ~/.node-gyp 文件夹下 
  # NODEJS_ORG_MIRROR 是 临时环境变量
  NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node node-gyp install
```
2. `node-gyp configure`
```bash

```
3.  `node-gyp build`
```bash
  # 生成的模块在 build/Release/first.node
  # 可以用 requre('./build/Release/first.node') 来引用
```
