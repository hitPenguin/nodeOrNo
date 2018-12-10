// 典型例子
var a = [];
// for 循环里 和 内部代码块 是 两个区域
for (let i = 0; i < 10; i ++) {
  // let i = 'abc';
  a[i] = function() {
    console.log(i);
  }
}
a[4](); // 4

/**
 * let 和 const
 * 1. 不存在 变量提升 ===> 声明前不能用，typeof 也不能用
 * 2. 暂时性死区 ===> 同名全局变量也不能用
 * 3. 不允许重复声明
 */



// 全局变量 global 
/**
 * [ 'console',
 *   'global',
 *   'process',
 *   'Buffer',
 *   'clearImmediate',
 *   'clearInterval',
 *   'clearTimeout',
 *   'setImmediate',
 *   'setInterval',
 *   'setTimeout' ]
 */


 // 函数声明的用法

 // es5 不允许
 if (true) {
   function f () {

   }
 }
 