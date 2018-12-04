// 处理上传的数据

// 检测body是否有内容
var hasBody = function(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers
}

// 解析body暂挂到req.rawBody上
function requestHandler(req, res) {
  if(hasBody(req)) {
    var buffers = [];
    req.on('data', function(chunk) {
      buffers.push(chunk);
    });
    req.on('end', function() {
      req.rawBody = Buffer.concat(buffers).toString();
      requestHandler(req, res);
    })
  } else {
    requestHandler(req, res);
  }
}

// 处理表单数据 | Content-Type: application/x-www-form-urlencoded
// querystring.parse(req.rawBody);
// 处理Json数据 | Content-Type: application/json[; charset=utf-8]
// req.headers['content-type'].split(';')[0]; ---> JSON.parse(req.rawBody);
// 处理XML文件 | Content-Type: application/xml[; charset=utf-8];
// 同上 ---> xml2js模块
// 处理表单上传的文件 | Content-Type: multipart/form-data; boundary=AaBO3
// 报文体的内容在前后都添加 -- 进行分割。 | 推荐模块 formidable


// 数据上传和控制

// 1.内存限制
var bytes = 1024;
function requestHandler(req, res) {
  var received = 0;
  var len = req.headers['content-type'] ? parseInt(req.headers['content-length'], 10) : null;

  // 长度超过限制，返回请求实体过长的状态码
  if (len && len > bytes) {
    res.writeHead(413);
    res.end();
    return ;
  }
  // limit
  req.on('data', function(chunk) {
    received += chunk.length;
    if(received > bytes) {
      // 停止接收数据，触发end()
      req.destroy();
    }
  })
}
// 2.csrf | Cross-Site Request Forgery | 跨站请求伪造
var generateRandom = function(len) {
  return crypto.randomBytes(Math.ceil(len * 3 / 4)).toString('base64').slice(0, len);
}
var token = req.session._csrf || (req.session._csrf = generateRandom(24));
// 每次请求时都携带此_csrf值 | _csrf值可以存在表单，查询字符串，请求头中。