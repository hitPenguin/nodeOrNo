// const app = {
//   get () {
//     return [new Promise(resolve => resolve(2))];
//   }
// }

const a = Promise.all([function () {
  return [1, 2, 3];
}]) ;

a.then(data => console.log(data)).catch(e => console.log(e));