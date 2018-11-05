// 内容响应 -->  MIME
// Content-Type: text/html | text/plain
{/* <html><body>Hello World!</body></html>  */}
let res = {};

// 附件下载
res.sendfile = function(filepath) {
  fs.stat(filepath, function(err, stat) {
    var stream = fs.createReadStream(filepath);
    res.setHeader('Content-Type', mime.lookup(filepath));
    res.setHeader('Content-Length', stat.size);
    res.setHeader('COntent-Disposition', `attachment; filename="${path.basename(filepath)}"`);
    res.writeHead(200);
    stream.pipe(res);
  })
}
// 响应 JSON
res.json = (json) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(json));
}
// 响应跳转
res.redirect = (url) => {
  res.setHeader('Location', url);
  res.writeHead(302);
  res.end('Redirect to' + url);
}

// 视图渲染 | 模板
res.render = (view, data) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  var html = render(view, data);
  res.end(html);
}
// 模板技术实际上就是拼接字符串
// Hello <%= username %> { username: "JacksonTian" } ===> "Hello" + obj.username
// <%= username %> 正则表达式 | /<%=([\s\S]+?)%>/g
var render = (str, data) => {
  // 'Hello <%=username%>.' ==> 'Hello ' + obj.username + '.'
  // <%=username%> <====> ' + obj.username + '
  var tpl = str.replace(/<%=([\s\S]+?)%>/g, (match, code) => {
    return `' + obj.${code} + '`;
  });

  tpl = `var tpl = '${tpl}'\n return tpl;`;
  var complied = new Function('obj', tpl);
  return complied(data);
}

