# NGINX

## 代理

* `正向代理` | 客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息
* `反向代理` | 反向代理，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息

## Nginx 文件结构

* Events | HTTP 属于 main 块
* HTTP 包含 upstream 和多个 Server
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

