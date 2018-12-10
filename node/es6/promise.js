/**
 * 参数问题:
 *  1. prmise 实例数组 | 若 数组元素 不为 promise 实例，会进行转化
 *  2. Iterator 接口，且返回值均为 Promise 实例
 */
Promise.all()； // 参数为函数会先执行该函数，将结果进行 Iterator


/**
 * 参数问题:
 *  1. Promise 实例: 原封不动
 *  2. 带有 then 方法的对象 | 立即执行 then 方法
 *  3. 不具有 then 方法 | resolve(参数)
 *  4. 不带参数 | 返回一个 resolved 的 Promise 实例
 */
Promise.resolve()；


Promise.reject();