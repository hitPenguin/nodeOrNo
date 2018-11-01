# egg-core 加载顺序

## egg中类的继承关系

* egg-cluster/lib/app_worker.js文件中加载的是Application类的实例
* egg/lib/application.js 中的 Application 类继承自 EggApplication
* egg/lib/egg 中的 EggApplication 继承自 EggCore
* egg-core/lib/egg.js 中的 EggCore 继承自 KoaApplication
* KoaApplication 来自 koa 框架

## egg-cluster | lib/app_worker.js

```js
  // app_worker启动先加载application
  const Application = require(options.framework).Application;
```

## egg | lib/application.js | 实例化入口

```js
  constructor(options) {
    // 在 EggApplication 中加载 config
    super(options);       // 父级有 this.loader.loadConfig()
    // 在 Application 中加载其他
    this.loader.load();
  }
```

### egg-core | [EGG_LOADER]

* 在application实例中均有`[EGG_LOADER]`，指向`egg-core`下的加载文件(`lib/mixin`);
* egg中app_worker的loader`顺序`写在`自己模块`的类里，`具体逻辑`在`egg-core`文件夹里

### egg | lib/egg.js

```js

```
