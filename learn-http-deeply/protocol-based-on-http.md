# 基于 http 协议追加功能的协议

## SPDY 协议 | 以会话层的形式加入 | 控制对数据的流动

* 多路复用流 | 通过单一的 TCP 连接，无限制处理多个 HTTP 请求
* 赋予请求优先级 | 可以给 http 请求赋予优先级
* 压缩 HTTP 首部
* 支持推送功能 | 支持服务器主动推送数据
* 服务器提示功能 | 服务器可以主动提示客户端请求所需资源

## WebSocket 协议 | 全双工通信协议

* 在建立 Http 连接后，需要完成一次"握手"阶段
* 握手——请求
```
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Key:  键值 浏览器随机生成 base64编码
  Sec-WebSocket-Protocol: 记录使用的子协议 chat, superchat
  Sec-WebSocker-Version: 13
```
* 握手——响应
```
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: 键值 由 Sec-WebSocket-Key 生成
  Sec-WebSocket-Protocol: 确认使用的子协议 chat
```
* javascript 可调用 "The WebSocket API" (http://www.w3.org/TR/websockets) 内提供的 websocket 程序接口

## HTTP/2.0 

* SPDY 协议 | Google 起草
* HTTP Speed + Mobility | 微软起草 | 基于 SPDY 和 WebSocket 协议
* Network-Friendly HTTP Upgrade | 主要针对移动端