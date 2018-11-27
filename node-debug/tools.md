# node 调试 | 工具篇

## Source Map

* `source-map-support` 是通过 `Error.prepareStackTrace` 实现的
```bash
  $ uglifyjs app.js -o app.min.js --source-map 'url;=app.min.j.map' # uglifyjs 的 source map 的参数
  $ tsc --sourceMap app_ts.ts # tsc 默认生成 source map 的参数
```
* `source-map-support` 的源码参考 `../one-day-one-npm` 文件下的源码分析

## Chrome DevTools

* 首先创建服务文件
```js ./app.js
  const http = require('http');
  http.createServer(function(req, res) {
    res.end('hello, world!');
  }).listen(3000);
```
* 在 chrome 打开  `chrome://inspect` 点开 最下面的 Inspect
* 按 `ctrl + p` 打开文件进行调试，然后可以进行断点测试

## 实用的小模块

1. `npm i debug`
```js
  const debug = require('debug');
  debug('log') || debug('error:low') || debug('error:normal') || debug('error:high')
  /**
   * 启动参数 DEBUG
   * =* 打印所有类型的日志
   * =log 只打印 log 级别的日志
   * =error:* 打印以 error: 开头的日志
   * =error:*,-error:low 打印以 error: 开头并且过滤掉 error:low 类型的日志
```
2. `npm i repl2`

3. `npm i power-assert`

## Proxy 实现 热启动

