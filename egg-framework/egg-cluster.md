# egg-cluster源码解析 | 按顺序解析

## USAGE 

```js
  const startCluster = require('egg-cluster').startCluster;
  startCluster({
    baseDir: 'path/to/app',
    framework: 'path/to/framework'
  })
  // 如上代码即可启用egg的多进程模型master | agent | appWorkers
  // 也可添加回调,app启动后会执行，但函数出错master进程会退出
  startCluster(options, () => console.log('started'));

```


## index.js | 起始入口

```js
  // egg-bin 与 egg-scripts最终都会调用此接口   startCluster()
  exports.startCluster = function(options, callback) {
    new Master(options).ready(callback);
  };
```

### options参数列表
| Param | Type  | Description | 
| ----- | ----- | ----------- |
| baseDir | String | directory of application |
| framework | String | absolute path or npm package |
| workers | Number | numbers of app workers |


## lib/master.js | Master对象的建立 | 主要设置

```js
  this.agentWorkerIndex = 0;
  this.closed = false;
  this.isStarted = false;
  // Manager负责进程相关状态的管理    Messenger负责进程间的通信
  this.workerManager = new Manager();
  this.messenger = new Messenger(this);
```

```js
  // 此时加载框架的package.json的信息
  const frameworkPkg = utility.readJSONSync(path.join(frameworkPath, 'package.json'));
```

### framework的获取 | egg-utils包内

```js
  // from egg-utils/lib/framework.js
  function getFrameworkPath({ framework, baseDir }) {
    const pkgPath = path.join(baseDir, 'package.json');
    const moduleDir = path.join(baseDir, 'node_modules');
    const pkg = utility.readJSONSync(pkgPath);
    // 1. pass framework or customEgg
    if (framework) {
      // 1.1 framework is an absolute path
      // framework: path.join(baseDir, 'node_modules/${frameworkName}')
      if (path.isAbsolute(framework)) {
        return framework;
      }
      // 1.2 framework is a npm package that required by application
      // framework: 'frameworkName'
      return assertAndReturn(framework, moduleDir);
    }
    // 2. framework is not specified
    // 2.1 use framework name from pkg.egg.framework
    if (pkg.egg && pkg.egg.framework) {
      return assertAndReturn(pkg.egg.framework, moduleDir);
    }
    // 2.2 use egg by default
    return assertAndReturn('egg', moduleDir);
}
```

### 进程间启动顺序 master ---> agentWoker ---> appWorker

* Master 启动后先 fork Agent 进程
* Agent 初始化成功后，通过 IPC 通道通知 Master
* Master 再 fork 多个 App Worker
* App Worker 初始化成功，通知 Master
* 所有的进程初始化成功后，Master 通知 Agent 和 Worker 应用启动成功

```js
  this.on('agent-exit', this.onAgentExit.bind(this));
  this.on('agent-start', this.onAgentStart.bind(this));
  this.on('app-exit', this.onAppExit.bind(this));
  this.on('app-start', this.onAppStart.bind(this));
  this.on('reload-worker', this.onReload.bind(this));
  // fork app workers after agent started
  this.once('agent-start', this.forkAppWorkers.bind(this));
  // get the real port from options and app.config
  // app worker will send after loading
  this.on('realport', port => {
    if (port) this[REALPORT] = port;
  });
```

### 生产环境下的自检

```js 
  // 检测Production环境，定时自检
  // 启动workerManager.startCheck()
  this.workerManager.on('exception', ({ agent, worker }) => {
    process.exit(1);
  });
```

## 启动顺序分析

### detect-port包检测端口 | 随机端口建立TCP服务器后断开连接，返回端口号 | 开始fork Agent进程

```js
  // 检测端口并启动forkAgentWorker
  detectPort((err, port) => {
    /* istanbul ignore if */
    if (err) {
      err.name = 'ClusterPortConflictError';
      err.message = '[master] try get free port error, ' + err.message;
      this.logger.error(err);
      process.exit(1);
    }
    this.options.clusterPort = port;
    this.forkAgentWorker();
  });
```

### detectPort() ===> forAgentWorker()方法

```js
  // 代码简化
  const agetn = cp.fork(agent_worker_file);
  agent.status = 'starting';
  agent.id = ++this.agentWorkerIndex;
  this.workerManager.setAgent(agentWorker);
  agentWorker.on('message', () => this.messenger.send('agent-start'));
  agentWorker.once('exit', () => this.messenger.send('agent-exit'));
```

### agent-start ===> 单次触发forkAppWorkers()方法

```js
  this.isAllAppWorkerStarted = false;
  this.startSuccessCount = 0;
  // 利用cfork和cluster包
  cfork({ 
    // ...参数省略
    refork: this.isProduction 
  });
  cluster.on('fork', (worker) => {
    this.workerManager.setWorker(worker);
    worker.on('message', () => {
      this.messenger.send('realport');
    })
  });
  cluster.on('exit', (worker) => {
    this.messenger.send('app-exit');
  });
  cluster.on('listening', (worker) => {
    this.messenger.send('app-start');
  });
```

### agent-start ===> onAgentStart()方法

```js
this.agent.status = 'started';
  // isAllAppWorkerStarted
  if (this.isAllAppWorkerStarted) {
    // 发送options
    this.messenger.send('egg-ready to agent');
  }
  // 发送worker.pid
  this.messenger.send('egg-pids to app');
  if (this.started) {
    // 发送 workers.pids
    this.messenger.send('egg-pids to agent');
  }
  this.messenger.send('agent-start to app');
```

### 'app-start' ===> onAppStart()

```js
  // 发送更新后的workers.pids列表
  this.messenger.send('egg-pids to agent')；
  this.startSuccessCount ++;
  if (this.isAllAppWorkerStarted) {
    // 发送this.options
    this.messenger.send('egg-ready to app');
  }
  if (this.isAllAppWorkerStarted) {
    worker.disableRefork = false;
  }
  if (this.isAllAppWorkerStarted || this.startSuccessCount < this.options.workers) {
    return;
  }
  this.isAllAppWorkerStarted = true;
  for (const id in cluster.workers) {
    const worker = cluster.workers[id];
    worker.disableRefork = false;
  }

  address.protocal = this.options.https ? 'https' : 'http';
  address.port = this.options.sticky ? this[REALPORT] : address.port;
  this[APP_ADDRESS] = getAddress(address);
  // websocket要自带--sticky参数 
  // startMasterSocketServer() {
  //   master创立TCP服务器对外接收socket,并把它随机传递给worker并自主触发其connecting事件
  // }
  if (this.options.sticky) {
    this.startMasterSocketServer(err => {
      if (err) return this.ready(err);
        this.ready(true);
    });
  } else {
    this.ready(true);
  }
```

### get-ready模块 | 最后触发

```js
  this.isStarted = true;
  // 发送端口 地址
  this.messenger.send('egg-ready to parent');
  // 发送options
  this.messenger.send('egg-ready to app');
  // 发送options
  this.messenger.send('egg-ready to agent');
  // 开始自检
  if (this.isProduction) {
    this.workerManager.startCheck();
  }
```
* `startCheck()方法`
```js
  startCheck() {
    this.exception = 0;
    this.timer = setInterval(() => {
      const count = this.count();
      if (count.agent && count.worker) {
        this.exception = 0;
        return;
      }
      this.exception++;
      if (this.exception >= 3) {
        this.emit('exception', count);
        clearInterval(this.timer);
      }
    }, 10000);
  }
```

## agentWorker进程退出 | agent-exit | onAgentExit

```js
  // 发送[]
  this.messenger.send('egg-pids to app')
  agent.removeAllListeners();
  // 项目启动则重启agent，项目未启动则直接退出
  if (isStarted) {
    setTimeout(() => this.forkAgentWorker(), 1000);
  } else {
    process.exit(1);
  }
```

## appWorker进程退出 | app-exit | onAppExit

```js
  // 是否refork由环境决定 production | development | 。。。
  worker.removeAllListeners();
  this.workerManager.deleteWorker(workerPid);
  // 发送workers.pids
  this.messenger.send('egg-pids to agent');
  if (isAllAppWorkerStarted) {
    // code
  } else {
    process.exit(1);
  }
```

## master进程退出 | onSignal

```js
  if (this.closed) return;
  this.close();
```

### master | close()方法

```js
  this.closed = true;
  this.killAppWorkers();
  this.killAgentWorker();
  const timeout = process.env.EGG_MASTER_CLOSE_TIMEOUT || 5000;
  setTimeout(() => process.exit(0), timeout);
```

### master | killAgentWorker()

```js
  if (this.agentWorker) {
    this.agentWorker.removeAllListeners();
    this.agentWorker.kill('SIGTERM');
  } 
```

### master | killAppWorkers()

```js
  //const cluster = require('cluster');
  for (const id in cluster.workers) {
    const worker = cluster.workers[id];
    worker.disableRefork = true;
    worker.process.kill('SIGTERM');
  }
```


