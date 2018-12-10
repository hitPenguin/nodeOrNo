var babel = require('babel-core');

// 字符串转码
console.dir(babel.transform('code();', {}));
// => { code, map, ast }