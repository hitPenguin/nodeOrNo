/**
 * 基本排序
 * 算法复杂度基本都为 O(n2)
 */

function swap(array, one, other) {
  let tem = array[one];
  array[one] = array[other];
  array[other] = tem;  
}

// 三种算法最优的是 直接插入法

// 选择法
/**
 * [5, 7, 3, 1, 4] ===> [4, 7, 3, 1, 5] => [1, 7, 3, 4, 5] => [1, 7, 3, 4, 5] 单次循环完成　
 *  |           |        |        |         |     |            |  |
 * 1. 每次循环一圈找到最小的
 * 2. 将最小的值和最头的值交换
 * 3. 初始值加 1
 * 算法复杂度: n-1 + ... + 3 + 2 + 1 ===> O(n2)
 */

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
/**
 * [5, 7, 3, 1, 4] => [5, 7, 3, 1, 4] => [5, 7, 1, 3, 4] => [5, 1, 7, 3, 4] => [1, 5, 7, 3, 4] 单次循环完成
 *           |  |            |  |            |  |            |  |
 * 1. 每圈把相邻的两个元素进行排序
 * 2. 最大值减　1 
 * 算法复杂度: n-1 + ... + 3 + 2 + 1 ===> O(n2)
 */

function bubbleSort(array) {
  let len = array.length;
  for(let i = 0; i < len; i ++) {
    for(let j = len - 1; j > i; j --) {
      array[j] < array[j - 1] ? swap(array, j, j - 1) : null;
    }
  }
  console.log(array);
}

// 直接插入排序 --> 内部是冒泡排序
/**
 * [5, 7, 3, 1, 4] => [5, 7, 3, 1, 4] => [5, 7, 3, 1, 4] => [3, 5, 7, 1, 4] => [1, 3, 5, 7, 4] => [1, 3, 4, 5, 7]
 *  |                  |  |               |  |  |            |  |  |  |         |  |  |  |  |
 * 1. 原数组长度从 1 开始
 * 2. 每增加一个元素对数组进行冒泡排序
 * 3. 原数组长度加　1
 * 算法复杂度: 最好情况 n ===> O(n) | 最坏情况 n-1 + ... + 3 + 2 + 1 ===> O(n2)
 */

function insertionSort(array) {
  let len = array.length;
  for(let i = 0; i < len; i ++) {
    for(let j = i; j > 0; j --) {
      array[j] < array[j - 1] ? swap(array, j, j - 1) : null;
    }
  }
  console.log(array);
}shi