// cookie 会解析到 req.headers.cookie
// res.setHeader('Set-Cookie', args) ==> args 可以是字符串或者数组
function parseCookie(cookie) {
  var cookies = {};
  if(!cookie) {
    return cookies;
  }
  var list = cookie.split('; ');
  for(var i = 0; i < list.length; i ++) {
    var pair = list[i].split('=');
    cookies[pair[0].trim()] = pair[1];
  }
  return cookies;
}

// 提前处理并挂载cookie
function requestHandler(req, res) {
  req.cookies = parseCookie(req.headers.cookie);
  hande(req, res);
}
// 设置cookie
var serialize = function(name, val, opt) {
  var pairs = [name + '=' + encode(val)];
  opt = opt || {};

  if(opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
  if(opt.domain) pairs.push('Domain=' + opt.domain);
  if(opt.path) pairs.push('Path=' + opt.path);  // cookie影响到的路径
  if(opt.httpOnly) pairs.push('HttpOnly');     // HttpOnly 设置后，在document.cookie中不可见
  if(opt.secure) pairs.push('Secure');         // secure 设置后，只能在https中被传到服务器端进行验证

  return pairs.join('; ');
}
// 具体业务逻辑
var hande = function(req, res) {
  res.writeHead(200);
  if(!req.cookies.isVisit) {
    res.setHeader('Set-Cookie', [serialize('foo', 'bar'), serialize('foo', 'baz')]);
    res.end('欢迎第一次来到动物园');
  } else {
    // TODO
    res.end('动物园再次欢迎你');
  }
}