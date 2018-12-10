// symbol 是 第七种 数据类型
let s1 = Symbol('test');
typeof s1; // symbol
s1.toString(); // symbol(test)
let obj = {
  [s1]: 'name'
};
obj[s1]; // name

Object.getOwnPropertySymbols(obj) // 获取对象所有的 symbol 值1
Reflect.ownKeys(obj); // 获取对象所有的 常规 和 symbol 值
/**
 * 以下都是遍历不到的
 * 1. for ... in / for ... of
 * 2. Object.keys()
 * 3. Object.getOwnPropertyNames()
 * 4. JSON.stringify()
 */


Symbol('test') === Symbol('test'); // false
Symbol.for('test') === Symbol.for('test'); // true， 登记过的 symbol 
Symbol.keyFor(s1) // test