# 区块链

* 可以向任何节点写入数据

## 区块链由区块组成

### 区块头 | hash 是 256 位长度

1. 生成时间
2. 实际数据的哈希
3. 上一个区块的哈希
4. 。。。

### 区块体

## 区块的 hash

* 针对 区块头 计算的， 把 区块头 的各项特征值， 按顺序连接在一起成字符串， 再对字符串计算哈希

## 新区块的添加 | 采矿

* 区块头包含 难度系数 | 哈希 / 难度系数 < 目标值 才是有效的哈希
* 难度系数 是动态调节的
* 新区块有分叉要采用最长的， 先达到 6 个新区块的会采用(称为"六次确认")。

# 比特币

* 每个钱包都有相应的 公钥 和 私钥

## 比特币 | 交易过程

* 转出比特币的一方要提供的是:
```js
  /**
   * 1. 上一笔交易的 hash
   * 2. 本次交易双方的地址
   * 3. 支付方的公钥
   * 4. 支付方的私钥生成的数字签名
   */
```
* 交易验证步骤:
```js
  /**
   * 1. 找到上一笔交易，确认比特币来源
   * 2. 算出支付方公钥的指纹， 确认与支付方的地址一致
   * 3. 使用公钥解开数字签名， 保证私钥属实
   */
```
* 交易数据写入区块链数据库
```js
  /**
   * @一个区块大小为 1mb， 一笔交易大约是 500字节
   * @矿工负责把交易打包生成新区块
   * @比特币只存在于区块链上
   */
```
* 旷工的收入来源：
```js
  /**
   * 1. 新区块的奖励 (奖励逐年降低)
   * 2. 交易手续费 (交易不给手续费， 旷工不把你的交易写入)
   */
```

## 点对点网络 

* 每个人都可以成为一个节点 | 每个节点都有完整的区块链 | 节点间时刻在同步信息
