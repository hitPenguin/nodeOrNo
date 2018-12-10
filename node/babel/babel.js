// npm install babel-register
require('babel-register');
require('./app.js') // .js | .jsx | .es | .es6 会自动转换
// 实时转码，只适合开发环境


// npm install babel-core | babel-core 不转化 api
var babel = require('babel-core');
options // 可参考 babelrc
// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }



// npm install babel-polyfill
import 'babel-polyfill'; 
require('babel-polyfill'); // 加入在脚本头部





// 浏览器环境

// 1. npm install babel-core@old
//    找到 node_modules/babel-core/ 下的 browser.js | browser.min.js
/**
 * <script src="node_modules/babel-core/browser.js"></script>
 * <script type="text/babel">
 * // Your ES6 code
 * </script>
 */

 `<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
  <script type="text/babel">
  // Your ES6 code
  </script>`


  // eslint 和 babel 结合
  // .eslint 文件下添加:
  var obj = {
    parser: "babel-eslint"
  }


  // mocha 和 babel 结合
  var obj = {
    scripts: {
      "test": "mocha --ui qunit --compilers js:babel-core/register"
    }
    // --compilers 指定编码器
    // js 所要编码的文件 | babel-core/register 转码工具
  }