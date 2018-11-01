# RESTful API 风格 | 探讨

## api 形式

* 动词 + 宾语
  ```
    GET 读取 read
    POST 新建 create
    PUT 更新 update
    DELETE 删除 Delete
  ```
* 动词覆盖
  ```
    若客户端只能发GET、POST
    X-HTTP-Method-Override: PUT
    可以在请求头添加'X-HTTP-Method-Overried'字段
  ```
* 宾语
  ```
    最好是名词，且最好是复数。例如:articles，osds，hosts
    想要直接获取什么就写什么，例如获取文章就用/article
  ```
* 避免多级URL
  ```
    考虑只用一级url
    例如 GET  /api/articles?published=true
  ```
* 过滤信息
  ```
    ?limit=10&&page=2;
    ?type=web;
  ```
  

## 服务器返回的状态码

### 2XX 状态码

  * GET 200 OK
  * POST 201 Created
  * PUT 200 OK
  * DELETE 204 No Content
  * 202 Accepted 服务器收到请求，会在未来处理

### 3XX 状态码

  * 301 永久重定向
  * 302 暂时重定向 307 多用于GET请求
  * 303 用于POST，PUT，DELETE请求

### 4XX 状态码

  * 400 Bad Request 服务器不理解客户端的请求
  * 401 Unauthorized 用户未通过身份验证
  * 403 Forbidden 用户通过验证，但不具备访问权限
  * 404 Not Found 所请求资源不存在
  * 405 Method Not Allowed 用户通过验证，但请求方式不能接受
  * 406 Not Acceptable 用户请求格式不正确
  * 410 Gone 所请求的资源已转移
  * 415 Unsupported Media Type 客户端要求的返回格式不正确
  * 422 Unprocessable Entity 客户端上传的附件无法处理
  * 429 Too Many Requests 客户端请求次数超限

### 5XX 状态码

  * 500 Internal Server Error 客户端请求有效，处理时发生了意外
  * 503 Service Unavailable 服务端无法处理请求

## 服务器回应

  ```
  不返回纯文本数据，数据均用json格式返回
  发生错误时，不要返回200状态码
  可以给api写个总的api，用于公开api
  ```

## RESTful 实例

```js
  // koa | egg 框架
  router.post('/api/articles', 'article.createArticle');
  router.delete('/api/articles/:title', 'article.deleteArticle');
  router.put('/api/articles/:title', 'article.updateArticle');
  router.get('/api/articles/:title', 'article.getArticle');
  router.get('/api/articles', 'article.listArticles');
  // 前端api
  ajax('GET', '/api/articles?limit=10&&page=2');
```