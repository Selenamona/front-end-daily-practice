/**
 * 题1
 * 计算数组的 中心下标
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  // 1、左和==右和；耗时308 ms；内存消耗: 40 MB
  // let sum1 = 0;
  // let n = -1
  // for (var i = 0; i < nums.length; i++) {
  //   sum1 += (nums[i - 1] || 0)
  //   let sum2 = 0;
  //   for (var j = nums.length - 1; j > i; j--) {
  //     sum2 += nums[j]
  //   }
  //   if (sum1 === sum2) n = i
  //   if (n > -1) return n
  // }
  // return n

  // 2、 计算总和 = 左和 * 2 + i ；耗时108 ms；内存消耗: 40.2 MB
  let total = 0
  nums.forEach(item => {
    total += item
  })

  let ls = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + ls * 2 === total) {
      return i
    } else {
      ls += nums[i]
    }
  }
  return -1
};
// const result = pivotIndex([-1, -1, -1, -1, -1, -1])
// const result = pivotIndex([1, 7, 3, 6, 5, 6])
// console.log("🚀 result", result)


/**
 * 题2
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  // 1、 执行用时：76 ms；内存消耗：38.7 MB
  // const k = nums.indexOf(target)
  // if (k > -1) {
  //   return k
  // }
  // for (let i = 0; i < nums.length; i++) {
  //   if (target < nums[i]) {
  //     return i
  //   } else {
  //     if (i === nums.length - 1) {
  //       return i + 1
  //     }
  //   }
  // }
  // 2、执行用时： 64 ms；内存消耗：38.6 MB
  let ls = nums.length
  for (let i = 0; i < nums.length; i++) {
    if (target <= nums[i]) {
      ls = i
      return ls
    }
  }
  return ls

};
// console.log(searchInsert([1, 3, 5, 6], 5))


/**
 * 题3
 * 返回一个不重叠的区间数组
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  intervals.reduce((a, b, c, d) => {
    console.log(a, b);
  })
  return 1
};

console.log(merge([
  [2, 6],
  [1, 3],
  [8, 10],
  [15, 18]
]))


// sort  test
// const ls = [
//   [2, 6],
//   [1, 3],
//   [8, 10],
//   [15, 18]
// ]
// const bv = ls.sort((a, b) => {
//   // console.log(a, b);
//   return a[0] - b[0]
// })

// console.log(ls, 1);
// console.log(bv, 2);
