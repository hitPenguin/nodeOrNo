// 堆排序

function swap(array, one, other) {
  let tem = array[one];
  array[one] = array[other];
  array[other] = tem;  
}

/**
 * 1. 
 */

 function shellSort(array) {
   const gap = [5, 2, 1] ;
 }