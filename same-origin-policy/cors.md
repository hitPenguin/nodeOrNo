## CORS 与 JSONP | JSONP 兼容性更好

* 目前所有浏览器都支持该功能， IE 浏览器不低于 IE10

* 只要同时满足两个条件即是简单请求
1. 请求方法是： HEAD， GET， POST
2. HTTP 的头信息不超出以下几种字段： Accept， Accept-Language， Content-Language， Last-Event-ID， Content-Type(application/x-www-form-urlencoded, multipart/form-data, text/plain)
* 不满足以上条件即是非简单请求

### 简单请求

* 跨域 AJAX 为简单请求，自动在头信息中加入 Origin 字段： 协议 + 域名 + 端口
* 若不许可， 则不包含 Access-Control-Allow-Origin 字段， 被 XMLHttpRequest 的 onerror 回调捕获， 不能通过状态码判断
* 若许可， 服务器返回的响应会包含：
1. Access-Control-Allow-Origin: 要么是 Origin， 要么是 *；
2. Access-Control-Allow-Credentials: 字段可选 | 只能为 true，表示服务器是否接受 Cookie 的请求
3. Access-Control-Expose-Headers: 字段可选 | CORS 请求时，XMLHttpRequest() 只能拿到 Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma, 其他的只能通过此字段定制

* xhr.withCredentials
```js
  // 设置为 true，会连带发送 cookie 
  // 且 服务器的 cookie 满足同源策略， documen.cookie 不能获取
  xhr.withCredentials = true | false;
```

### 非简单请求

* 方法是 PUT 或者 DELETE，或者 Content-Type 是 application/json
* 非简单请求的 CORS 请求， 会在通信前加一次 预检 请求
```js
  OPTIONS /cors HTTP/1.1
  // 表明客户端 地址
  Origin: http://api.bob.com
  // 浏览器的 CORS 会用到哪些方法
  Access-Control-Request-Method: PUT
  // 指定浏览器 CORS 请求所带的 额外 的头字段
  Access-Control-Request-Headers: X-Custom-Header
  Host: api.alice.com
  Accept-Language: en-US
  Connection: keep-alive
  User-Agent: Mozilla/5.0...
```
* 预检 的回应
```js
  // 服务器检查完 Origin， Access-Control-Request-Method， Access-Control-Request-Headers 字段后
  HTTP/1.1 200 OK
  Date: Mon, 01 Dec 2008 01:15:39 GMT
  Server: Apache/2.0.61 (Unix)
  // 最重要， 可以是 Origin 或者 *
  Access-Control-Allow-Origin: http://api.bob.com
  // 浏览器可以用的方法
  Access-Control-Allow-Methods: GET, POST, PUT
  // 如果请求有，回应必带，不限于请求中的
  Access-Control-Allow-Headers: X-Custom-Header
  // 服务器是否接受请求带 cookie
  Access-Control-Allow-Credentials: true
  // 本次 预检请求 的有效期
  Access-Control-Max-Age: 1728000
  Content-Type: text/html; charset=utf-8
  Content-Encoding: gzip
  Content-Length: 0
  Keep-Alive: timeout=2, max=100
  Connection: Keep-Alive
  Content-Type: text/plain
```
* 浏览器的正常请求和回应
* 请求时自带 Origin 字段
* 回应时自带 Access-Control-Allow-Origin