# source-map-support 包 解析

## 所依赖的包

1. `buffer-from`
2. `source-map`

## 入口文件 | ./source-map-support.js

1. 检测 `fs.existsSync` 与 `fs.readFileSync` 是否存在，均不存在则 `fs = null` 
2. 文件读取
```js
  // 初始化
  fileContentsCache = {};
  retrieveFileHandlers = [];
  // retrieveFileHandlers 第一个元素为 function 
  // function 简化版
  function (path) {
    path.trim().replace(/file:\/\/\//, '' || '/');
    if (fileContentsCache(path)) {
      return fileContentsCache[path];
    } else if (!fs) {
      contents = ajax.open('GET', path, false);
    } else {
      contents = fs.readFile(path, 'utf8');
    }
    return fileContentsCache[path] = contents;
  }
  retrieveMapHandlers = [];
  // retrieveMapHandlers 第一个元素为 function
  // function 简化版
  
```

## 相关拓展

1. File 协议: 本地文件传输协议
```
  file 的通用头: file:///
  windows 上:
    file:///f:/flash/1.swf
  linux 上:
    file:///home/yy/Desktop/work/kunkka/package.json
```