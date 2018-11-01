const http = require('http');

// 基本服务器

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain '});
  res.end('hello world\n');
});

console.log('Server running at http://127.0.0.1:1337');

// 或者函数抽象出来

http.createServer(requestHandler);

function requestHandler (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain '});
  res.end('hello world\n');
}