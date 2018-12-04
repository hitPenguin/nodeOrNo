// 路由映射

// 1.手工映射
exports.setting = function(req, res) {
  // TODO
}

var routes = [];

var use = function(path, action) {
  routes.push([path, action]);
}

function requestHandle(req, res) {
  var pathname = url.parse(req.url).pathname;
  for(var i = 0; i < routes.length; i ++) {
    var route = routes[i];
    if(pathname === route[0]) {
      var action = route[1];
      action(req, res);
      return ;
    }
  }
  // 处理404请求
  handle404(req, res);
}
// use('/user/setting', exports.setting);
// 利用正则匹配 | 省略

// RESTful 风格
var routes = { 'all': [] };
var app = {};
app.use = function(path, action) {
  routes.all.push([pathRegexp(path), action]);
};

['get', 'put', 'delete', 'post'].forEach(function(method) {
  routes[method] = [];
  app[method] = function (path, action) {
    routes[method].push([pathRegexp(path), action]);
  };
});
// app.post('/user/:username', addUser);