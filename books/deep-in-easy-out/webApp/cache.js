// 利用Etag和last-Modified两个字段 
// 每次请求头分别对应携带If-None-Match和Last-Modified-Since
// fs.stat() 检测文件是否存在 | 返回fs.stats对象
// Stats {
//   dev: 2114,
//   ino: 48064969,
//   mode: 33188,
//   nlink: 1,
//   uid: 85,
//   gid: 100,
//   rdev: 0,
//   size: 527,
//   blksize: 4096,
//   blocks: 8,
//   atimeMs: 1318289051000.1,
//   mtimeMs: 1318289051000.1,
//   ctimeMs: 1318289051000.1,
//   birthtimeMs: 1318289051000.1,
//   atime: Mon, 10 Oct 2011 23:24:11 GMT,
//   mtime: Mon, 10 Oct 2011 23:24:11 GMT,              // mtime 最后修改时间
//   ctime: Mon, 10 Oct 2011 23:24:11 GMT,
//   birthtime: Mon, 10 Oct 2011 23:24:11 GMT }

// Last-Modified | If-Modified-Since
var handle = function(req, res) {
  fs.stat(filename, function(err, stat) {
    var lastModified = stat.mtime.toUTCString();
    if(lastModified === req.headers['if-modified-since']) {
      res.writeHead(304, "Not Modified");
      res.end();
    } else {
      fs.readFile(filename, function(err, file) {
        var lastModified = stat.mtime.toUTCString();
        res.setHeader("Last-Modified", lastModified);
        res.writeHead(200, 'ok');
        res.end(file);
      })
    }
  })
}
// ETag --> Entity Tag | If-None-Match
var getHash = function(str) {
  var shasum = crypto.createHash('sha1');
  return shasum.update(str).digest('base64');
}
var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    var hash = getHash(file);
    var noneMatch = req.headers['if-none-match'];
    if(hash === noneMatch) {
      res.writeHead('304', 'Not Modified');
      res.end();
    } else {
      res.setHeader('ETag', hash);
      res.writeHead(200, 'Ok');
      res.end(file);
    }
  })
}

// 设置Expires 和 cache-Control 减少http请求

// expires
var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
    res.setHeader("Expires", expires.toUTCString());
    res.writeHead(200, 'Ok');
    res.end(file);
  });
}
// cache-control | http 1.0 不支持
var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    res.setHeader('Cache-Control', 'max-age=' + 10 * 365 * 24 * 60 * 60 * 1000);
    res.writeHead(200, 'Ok');
    res.end(file);
  })
}

// 浏览器根据url进行缓存
