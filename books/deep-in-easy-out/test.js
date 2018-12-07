const nativeMap = (arr, callback) => {
  return arr.map(callback);
}

const customMap = (arr, callback) => {
  var ret = [];
  for (let i = 0; i < arr.length; i ++) {
    ret.push(callback(arr[i], i, arr));
  }
  return ret;
}

const run = (name, times, fn, arr, callback) => {
  const start = (new Date()).getTime();
  for (let i = 0; i < times; i ++) {
    fn(arr, callback);
  }
  const end = (new Date()).getTime();
  console.log('Running %s %d times cost %d ms', name, times, end-start);
}

const callback = (item) => {
  return item;
}

run('nativeMap', 1000000, nativeMap, [0, 1, 2, 3, 5, 6], callback);
run('customMap', 1000000, customMap, [0, 1, 2, 3, 5, 6], callback);