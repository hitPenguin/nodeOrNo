# 平常工作的错误集合

## egg框架问题
* ctx.request.body解析body参数
* ctx.params解析动态路由参数
* ctx.query解析查询字符串参数
```js
  // controller中文件
  const { name, age, sex } = this.ctx.request.body;
  const { address } = this.ctx.params;
  const { page, limit } = this.ctx.query;
```
* 函数名要对应,例如router中和controller中和service中的函数名要对应
```js
  // router
  router.get('/username', 'user.getName')
  // controller/user.js
  async getName() {
    // leave out validate ...
    this.ctx.body = await this.ctx.service.getName();
  }
  // service/user.js
  async getName() {
    // leave out code ...
  }
```
* garen | 注意添加新的api时要在对应的local配置中注意proxy和bodyparser
```js
  // config文件中
  bodyparser: {
    // body-parse的控制
    ignore: ctx => !ctx.path.indexOf('/username') 
  }
  proxy: {
    // 是否转代理
    match: ctx => !ctx.path.indexOf('/username')
  }
```
* 各个参数名的对应问题,例如body，params，query中的参数名问题
```js
  // 写好文档 注意参数对应
```
* 考究boom中对应的报错码的使用
```js
  // 409
  boom.confilct()
  // 404 
  boom.notFound()
  // 具体可参考npmjs.com/package/boom
```
* 考虑函数合并问题
```js
  // 多个类似函数，例如各种查找函数可以考虑合并
  function getName() {}
  function getAge() {}
  // 可以考虑合并成如下格式 
  function get(param) {} 
```


## javascript问题

* `[]` | `{}` 在转化为boolean值时是true
```js
  console.log( [] ? true : false);
  // true
```
* 写if语句时考虑值与非值的情况

## 基本逻辑问题

* 时刻考虑api与其他api的区别以及api的形式
```js
  // 具体参考rest-api.md
```


