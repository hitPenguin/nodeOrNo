// 处理静态文件

function requestHandler(req, res) {
  var pathname = url.parse(req.url).pathname;
  fs.readFile(path.join(ROOT, pathname), function(err, file) {
    if(err) {
      res.writeHead(404);
      res.end('找不到相关文件。- -');
      return ;
    }
    res.writeHead(200);
    res.end(file);
  })
}

// 根据场景解析控制器
// /controller/action/a/b/c


function requestHandler(req, res) {
  var pathname = url.parse(req.url).pathname;
  var paths = pathname.split('/');
  var controller = paths[1] || 'index';
  var action = paths[2] || 'index';
  var args = path.slice(3);
  if(handles[controller] && handles[controller][action]) {
    handles[controller][action].apply(null, [req, res].concat(args));
  } else {
    res.writeHead(500);
    res.end('找不到响应控制器');
  }
}