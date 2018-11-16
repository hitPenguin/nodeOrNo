# NGINX

## 代理

* `正向代理` | 客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息
* `反向代理` | 反向代理，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息

## Nginx 文件结构

* Events | HTTP 属于 main 块
* HTTP 包含 upstream(负载均衡) 和多个 Server
* Server 又包含多个 location

### Nginx 全局配置

* `user` | 指定 Nginx Worker 进程运行用户以及用户组
* `worker_processes` |  指定 Nginx 要开启的进程数
* `error_log` | 定义全局错误日志文件
* `pid` | 指定进程 pid 的存储文件位置

### Nginx Event 模块 | 设定 Nginx 的工作模式及连接数上限

* `use` | 指定 Nginx 的工作模式 | select poll epoll
* `worker_connections` | Nginx 每个进程的最大连接数

### Nginx Http 服务器配置 

* `log_format` | 日志格式
```bash
  # log_format name format
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"'
```
变量名 | 说明 | 示例
---- | ---- | ----
$remote_addr | 客户端地址 | 10.0.230.240
$remote_user | 客户端用户名称 | --
$time_local | 访问时间和地区 | 18/Jul/2012:17:00:01 +0800
$request | 请求的 URI 和 HTTP 协议 | "GET /article-10000.html HTTP/1.1"
$status | HTTP 请求状态 | 200
$body_bytes_sent | 发送给客户端文件内容大小 | 1547
$http_referer | url 跳转来源 | https://www.baidu.com
$http_user_agent | 用户终端浏览器等信息 | "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
$http_x_forwarded_for | 原有的客户端 ip 和原来客户请求的 服务器地址 | 适用于多级反向代理
* 

* 正向代理
```bash
  # server {
  #   listen 80;  
  #   server_name nginx.wuhangbing.1.com;
  #   location / {
  #     root /home/whb;
  #     index index.html index.htm test.html;
  #   }
  # }
```
* 反向代理
```bash
  # server {
  #   listen 80;  
  #   server_name nginx.wuhangbing.1.com;
  #   location / {
  #     proxy_pass http://localhost:7001
  #   }
  # }
```
* location 匹配规则 | 按顺序匹配
  1. location = /uri | 精确匹配
  2. locatiion ^~ /uri | 对 URL 进行前缀匹配 | 多个匹配按最大原则匹配
  3. location ~ pattern | 区分大小写的正则匹配
  4. location ~* pattern | 不区分大小写的正则匹配
  5. location /uri | 前缀匹配，优先级弱于正则匹配
  6. location / | 通用匹配，相当于 switch 的 default

* 在 nginx 转发 websocket 协议时，需要在 nginx.conf 文件中进行配置
```
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
```


### 简化后的文件概览

```js
  user www-data;
  worker_processes auto;   // 工作进程个数
  pid /run/nginx.pid;      // pid 所在文件
  include /etc/nginx/modules-enabled/\*.conf  // 模块加载

  events {
    worker_connections 768;     // 单个工作进程最大同时连接数量
  }

  http {
    sendfile on; // 本来 内核 ---> 应用程序 ---> 套接字 | 开启后 内核 ---> 套接字对应的文件标识符
    tcp_nopush on; // 开启 cork 算法，是 Nagle 的替代优化算法
    tcp_nodelay on; // 小包变大包(Nagle 算法) | 开启后不延迟，立即发送
    keepalive_timeout 65; // 连接超时时间, 单位 s
    types_hash_max_size 2048; // 散列表，越大检索速度越快，内存消耗也越大

    include /etc/nginx/mime.types; // 文件拓展名与类型映射表
    default_type application/octet-stream; // 默认文件类型

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    access_log /VAR/log/nginx/access.log; // nginx 访问日志
    error_log /VAR/log/nginx/error.log;

    gzip on;

    include /etc/nginx/conf.d/\*.conf; // 自定义配置
    include /etc/nginx/sites-enabled/\*;
  }
```

```js
  // /etc/nginx/sites-enabled/default
  server {
    listen 80 default_server; // ipv4 对 ip 直接访问的默认处理服务器
    listen [::]:80 default_server; // ipv6 
    root /Var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _; // 服务器名称

    location / { // 匹配规则 1. 正则式 2. ～ 区分大小写的正则匹配
      /* proxy_pass http://localhost:3000 代理转发
       * 若 location /proxy/ {}
       * http://localhost:3000 | http://a.com/proxy/test.html ---> http://localhost:3000/proxy/test.html
       * http://localhost:3000/ | http://a.com/proxy/test.html ---> http://localhost:3000/test.html
       * http://localhost:3000/aaa | http://a.com/proxy/test.html ---> http://127.0.0.1/aaatest.html
       * http://localhost:3000/aaa/ | http://a.com/proxy/test.html ---> http://127.0.0.1/aaa/test.html
       */
      // alias "/root/ued/Ashe/static/wp-content"; // 替换路径
      try_files $uri $uri/ =404
      /* satisfy all/any | all 客户端要满足两个条件 | any 满足一个即可
       * 1. ngx_http_access_module 模块 | allow 127.0.0.1 | deny 127.0.0.1
       * 2. ngx_http_auth_basic_module 模块 | auth_basic 默认 off | auth_basic_user_file 保存用户账号密码的文件
       */
      // add header Cache-Control no-cache 增加首部字段
    }
  }
```

## http | upstream 模块 | 负载均衡

```js
  // 两种方法 ： 权重 (weight) 和 ip_hash
  upstream chenqiang {
    // ip_hash 
    // fair
    // uri_hash
    // weight
    server 10.0.6.108:7080 weight=5;
    server 10.0.0.85:8980 weight=10;
  }
  // 在 location 节点
  location / {
    root html;
    index index.html index.htm;
    proxy_pass http\:\/\/chenqiang;
  }
```

* 负载均衡的方法
1. 啥也不写： 按事件分配
2. 按权重： `server 10.0.0.82:7001 weight=5` 权重默认为1
3. ip_hash： 按ip的hash结果分配
4. fair: 按后端响应时间来分配 | 响应时间短的优先
5. url_hash: `hash $request_uri; hash_method crc32` | 按 url 的 hash 结果来分配

* upstream 中设备的状态值设置
1. down 表示当前设备不参与负载
2. backup 此台设备压力最轻
3. 

