// Set 结构 | 类似于数组, 但是 值 唯一
// Set 结构加入数据时, 会引用 === ， 唯一区别是 NaN 等于 NaN
const set = new Set(array);
[...new Set(array)] // 数组去重
set.size;
set.add(value);
set.delete(value);
set.has(value);
set.clear();

// Array.from(new Set(array)) 另一种数组去重

// 遍历方法 前三个均返回 Iterator 对象
set.keys(); // set.values(); 完全一致 'red'
set.entries(); // ['red', 'red']
set.forEach(handler)

// WeakSet 类似 Set 成员只能是对象
// WeakSet 是 弱引用，垃圾清除时不考虑
// WeakSet 不可 遍历
WeakSet.add();
WeakSet.delete();
WeakSet.has();


// Map | 值 - 值 的集合
Map.size;
Map.set(key, value); // key, value 都可以是 各种变量
Map.get(key);
Map.has(key); 
Map.delete(key);
Map.clear();
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
Map.keys(); // Map.values(); 完全一致 'red'
Map.entries(); // ['red', 'red']
Map.forEach(handler)


// WeakMap | 键名只接受 object 且和 WeakSet 一样