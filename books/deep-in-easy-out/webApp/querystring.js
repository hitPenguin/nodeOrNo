// 处理querystring并且挂载到req上

var url = require('url');
var querystring = require('querystring');
var query = querystring.parse(url.parse(req.url).query);
// 第二种
var query = url.parse(req.url, true).query;
req.query = query;
// foo=bar&foo=baz
// {
//   foo: ['bar', 'baz']   
// }