// cookie 的延伸 session

// 基于Cookie来实现用户和数据的映射
var sessions = {};
var key = 'session_id';
var EXPIRES = 20 * 60 * 1000;

var generate = function () {
  var session = {};
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expire: (new Date()).getTime() + EXPIRES,
  };
  sessions[session.id] = session;
  return session;
}

function requestHandler(req, res) {
  var id = req.cookies[key];
  if(!id) {
    req.session = generate();
  } else {
    var session = sessions[id];
    if(session) {
      if(session.cookie.expire > (new Date()).getTime()) {
        // 未过期重新设置时间为20分钟
        session.cookie.expire = (new Date()).getTime() + EXPIRES;
        req.session = session;
      } else {
        // 超时了
        delete sessions[id];
        req.session = generate();
      }
    } else {
      // 如果session口令不对
      req.session = generate();
    }
  }
  handle(req, res);
}
// cookie中session口令的设置
var writeHead = res.writeHead;
res.writeHead = function () {
  var cookies = res.getHeader('Set-Cookie');
  var session = serialize(key, req.session.id);
  cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
  res.setHeader('Set-Cookie', cookies);
  return writeHead.apply(this, arguments);
}

var handle = function(req, res) {
  if(!req.session.isVisit) {
    req.session.isVisit = true;
    res.writeHead(200);
    res.end('欢迎第一次来到动物园');
  } else {
    res.writeHead(200);
    res.end('欢迎再次来到动物园');
  }
}


