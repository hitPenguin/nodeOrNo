# 小知识点

## 加密算法

* 单钥：DES算法 Data Encryption
* 双钥：RSA算法 Rivest-Shamir-Adleman

## Unix系统结构 | 历史原因

* `/`: 存放系统程序
* `/usr`: 存放Unix系统商开发的程序
* `/usr/local`: 存放用户自己安装的程序

## 代码抽象三原则

* DRY原则 Don’t repeat yourself
  ```
    相同功能只提供一个方法，也叫'一次且仅一次'原则(Once and Only Once);
  ```
* YAGNI原则 You aren't gonna need it
  ```
    只开发最核心的功能,不过分抽象化
  ```
* 三次原则 Rule Of Three
  ```
    某个功能三次出现再抽象化，是以上两个原则的中和。
  ```

# IaaS PaaS SaaS | cloudServer

## IaaS 基础设施服务 | Infrastructure-as-a-service

* 用别人的厨房，炉子，煤气，烤自己的披萨
* Kitchen-as-a-Service

## PaaS 平台服务 | Platform-as-a-service

* 自己只设计披萨的味道
* Walk-In-and-Bake

## SaaS 软件服务 | Software-as-a-service

* 只管卖披萨
* Pizza-as-a-Service

# dependencies | devDependencies

* `npm install Xxx --save` | 安装模块，并把模块名和版本号添加到dependencies 部分
* `npm install Xxx --save-dev` | 安装模块,把模块名和版本号写在devdependencies部分
* `npm install --production` | 安装 dependencies 部分的模块
* `npm i` | 安装所有devDependencies 和 dependencies里面的模块

# 根域名

* DNS 根区 (DNS root zone) | 提供顶级域名所对应的域名服务器和服务器 ip (IPv4, IPv6)

# CAP 定理

* Consistency | 一致性
```js
  /**
   * @一致性
   *  所有的服务器的数据应该保持一致
   */
```
* Availability | 可用性
```js
  /**
   * @可用性
   *  只要收到用户请求，服务器必须要给出回应
   */
```
* Partition tolerance | 分区容错
```js
  /**
   * @分区容错
   *  区间通信可能失败
   */
```
* 可用性和一致性不能同时成立，要考虑特殊场合的优先性
