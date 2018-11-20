/**
 * 基本排序
 * 算法复杂度基本都为 O(n2)
 */

function swap(array, one, other) {
  let tem = array[one];
  array[one] = array[other];
  array[other] = tem;  
}

// 选择法

function selectSort(array) {
  let len = array.length;
  for(let i = 0; i < len; i ++) {
    for(let j = len - 1; j > i ; j --) {
      array[j] < array[i] ? swap(array, i, j) : null;
    }
  }
  console.log(array);
}

// 冒泡法

function bubbleSort(array) {
  let len = array.length;
  for(let i = 0; i < len; i ++) {
    for(let j = len - 1; j > i; j --) {
      array[j] < array[j - 1] ? swap(array, j, j - 1) : null;
    }
  }
  console.log(array);
}

// 直接插入排序