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
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    access_log /VAR/log/nginx/access.log;
    error_log /VAR/log/nginx/error.log;

    gzip on;

    include /etc/nginx/conf.d/\*.conf;
    include /etc/nginx/sites-enabled/\*;
  }
```

```js
  // /etc/nginx/sites-enabled/default
  server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /Var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
      try_files $uri $uri/ =404
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

