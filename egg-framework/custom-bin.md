# 自定义命令 | Node.js

## package.json | bin字段

* package.json有bin字段
```js
  // package.json
  "bin": {
    "my-git": "bin/my-git.js"
  }
```

## 模块安装

### 安装npm包时

* 在全局安装 npm i ${packagename} -g 默认把命令安装到系统默认环境中 一般为node 
* 在局部安装 npm i ${packagename} 会用符号链接链接到./node_modules/.bin/
* 在文件夹下 npm link, 会在全局执行此包，把命令写入全局环境

### 添加命令至package.json

```js
  // package.json
  "script": {
    "my-git": "my-git"
  }
```


  当在命令行打入`npm run my-git`时会把`./node_modules/.bin`文件夹下的文件加入默认环境路径。

## 符号链接 | 软连接

* 是一类特殊的文件，文件包含了另一个文件的路径名(绝对或者相对)。
* 对文件的操作会映射到对源文件的操作
* 删除符号链接不会影响源文件
* 目标文件被移动，重命名或删除，则符号链接被遗弃。

## node路径问题

```js
  // #!usr/bin/env node
```

### npm prefix | npm prefix -g

```js
  // 全局命令文件在__dirname/bin文件夹下，全局模块在__dirname/lib/node_modules文件夹下
  npm prefix -g
  // result: /home/chenqiang/.nvm/versions/node/v8.11.4
  npm prefix
  // result: /home/chenqiang/.nvm/versions/node/v8.11.4/lib
```

### 注意事项

* .bin文件夹下的文件都是软连接 | 符号链接。



