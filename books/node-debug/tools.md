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

## Istanbul 工具包

* istanbul 是 代码覆盖率 测试工具包
```js
  /**
   * Statements: 语句
   * Branches: 分支
   * Functions: 函数
   * Lines: 代码行数
```
* 覆盖率门槛
```bash
  istanbul check-coverage [options]
  # --statement -1 (90) || -1 只允许一条语句不被覆盖 / 90 覆盖率要达到 90%
  # --statement -5 --branch -3 --function 100 参数可以结合使用
```
* istanbul 和 mocha 的结合
```bash
  istanbul cover _mocha test/test.sqrt.js
```
* istanbul 忽略某些代码
```js
  var object = parameter || /* istanbul ignore next */ {}; // 注释要卸载 或 运算符的后面
  /* istanbul ignore if  */
  if (hardToReproduceError)) {
      return callback(hardToReproduceError);
  }
```

## 压力测试 | ab

```bash
  ab --help
  # -n : 总的请求数量
  # -c : 请求的并发数量
  # -t : 花费在基准测试的最大时间 
  # -s : 单个 response 的最大响应时间
```

```json
  {
    "Document Path": "文档路径: /",
    "Document Length": "报文的长度",
    "Concurrency Level": "并发的数量(级别)",
    "time taken for tests": "完成所有测试所需要的时间",
    "Complete requests": "完成的请求数",
    "Failed requests": "失败的请求数",
    "Total transferred": "所有的报文大小",
    "HTML transferred": "仅 http 报文的正文大小",
    "Requests per second": "服务器每秒能处理多少请求(RPS || QPS)",
    "两个Time per request": "分别代表 用户平均等待时间 和 服务器平均处理请求 的事件",
    "Transfer rate": "传输的大小除以传输事件",
    "Connection Times": "连接时间, 包括 建立连接，服务器处理，等待响应 的时间",
    "The Last": "请求的响应时间分布"
  }
```