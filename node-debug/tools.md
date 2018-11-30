# node 调试 | 工具篇

## Node 调试

```bash
  # 均使用 ws 协议进行 调试工具 和 调试文件 的链接
  $ node --inspect entry # node 自带的，启动有服务时的参数配置
  $ node --inspect-brk entry # node 自带的，代码在第一行就暂停执行，适合无服务的文件参数配置
```

```js
  node --inspect=port entry // 启动程序并且在 port 端口和开发者工具连接
  // Chrome DevTools Protocol 协议 | 协议基于 websocket
```

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
  const http = require('http') ;
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

```
  参考 本文档
```




### Chrome DevTools Protocol

* F12 是 chrome 的调试工具的打开按钮
* 调试工具与 页面 (chrome 内核) 通过 WebSocket 进行连接


```js
  DevTools // DevTools 是独立的 Web 应用程序
  // Node 是通过 v8-inspector protocol 来和 Chrome Devtools 进行连接的
```


* 当添加 --inspect 或者 --inspect-brk 时，默认开启本机的 9229 端口
* 此时可以访问 http://127.0.0.1:9229/json/list 返回元数据
```js
  [
    {
    description: "node.js instance",
    devtoolsFrontendUrl: "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/617bd3f2-9b8a-4c93-9521-23d8af16dd59",
    faviconUrl: "https://nodejs.org/static/favicon.ico",
    id: "617bd3f2-9b8a-4c93-9521-23d8af16dd59",
    // 进程的 入口文件
    title: "app.js",
    type: "node",
    url: "file:///home/yy/Desktop/test/app/app.js",
    // 包含 主机地址 ， 端口 ， 进程的 UUID
    webSocketDebuggerUrl: "ws://127.0.0.1:9229/617bd3f2-9b8a-4c93-9521-23d8af16dd59"
    }
  ]
```
* 拿出 `webSocketDebuggerUrl` 中的值，直连 inspector