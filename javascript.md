# javascript | 补充

## 代码覆盖工具 Istanbul


## 加载优化

### 针对图片

* 针对电脑和移动端，出两套图片
* 对图片进行压缩 (nginx 的 gzip 模块)

### 针对http请求 

* 对小图标使用精灵图合并，减少 http 请求

### 针对缓存 

* `memory-cache` 存在于浏览器未关闭前 | `disk-cache` 存在于硬盘中，平常设置的MAX-AGE即处理此
* 304 缓存策略 | 服务器端 `ETAG` , `Last-Modefied` | 客户端 `if-None-Match` , `if-Modefied-Since`

#### 具体的缓存策略

```js
  // h5 Application-Cache
  // service worker 
  // AMP
```