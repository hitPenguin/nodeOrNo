# node-inspect 包解析

* 解析 node-inspect 并且深入理解 node 的 inspect 调试

parseArgv([tgarget, ...args]) | 默认 | 以 host:port 开头 | 以 --port=port 开头 | 参数只有 -p pid
-- | -- | -- | -- | --
host | 127.0.0.1 | host | 127.0.0.1 | 127.0.0.1
port | 9229 | port | port | 9229
isRemote | false | true | false | true
script | process.argv.slice(2)[0] | null | process.argv.slice(2).shift()[0] | null
scriptArgs | process.argv.slice(2).shift() | process.argv.slice(2).shift() | process.argv.slice(2).shift().shift() | [ ]

## node-inspect 顺序解析

1. 参数解析(host, port, isRemote, script, scriptArgs)
2. run()
```js
  const child = spawn('node', ["--inspect-brk=9229"]);
  // 链接 websocket 然后处理 socket 文件
```
3. startRepl()
```js
  // 先启动
  const setupTasks = [
      Runtime.enable(),
      Profiler.enable(),
      Profiler.setSamplingInterval({ interval: 100 }),
      Debugger.enable(),
      Debugger.setPauseOnExceptions({ state: 'none' }),
      Debugger.setAsyncCallStackDepth({ maxDepth: 0 }),
      Debugger.setBlackboxPatterns({ patterns: [] }),
      Debugger.setPauseOnExceptions({ state: pauseOnExceptionState }),
      restoreBreakpoints(),
      Runtime.runIfWaitingForDebugger(),
    ];
```
4. 向 socket 中写命令


## 小知识点

* `process._debugProcess(pid)` | 将 调试器 和 进程进行连接
* `process.stdout.isTTY` | 目前的理解: 如果输出为终端则为 true, 为文件则为 undefined
* `process.stdout.cursorTo(position)` | 将光标移动到指定位置
```js
  require('readline').cursorTo(stream, x, y);
```
* `process.stdout.clearLine(dir)`
```js
  // 以指定的方式清除给定的 TTY 流的当前行:
  //   dir:
  //    -1 光标左边
  //    1 光标右边
  //    0 整行
  require('readline').clearLine(stream, dir);
```
* `util.inspect.custom`
```js
  {
    [util.inspect.custom](depth, options) {

    }
  }
```
* `events` 模块
```js
  new require('events').EventEmitter();
  // EventEmitter {
  // domain: null,
  // _events: {},
  // _eventsCount: 0,
  // _maxListeners: undefined }
```