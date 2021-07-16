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
  intervals.sort((a, b) => a[0] - b[0]) //依次排序
  return intervals.reduce((prev, cur, index) => {
    let peek = prev[prev.length - 1] //获取到prev中最后一项
    if (peek && peek[1] >= cur[0]) { //当前项和peek存在交集
      let left = peek[0]
      let right = peek[1] > cur[1] ? peek[1] : cur[1]
      prev[prev.length - 1] = [left, right]
    } else {
      prev.push(cur)
    }
    return prev
  }, [])
};

// console.log(merge([
//   [1, 3],
//   [2, 6],
//   [8, 10],
//   [15, 18]
// ]))


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

/**
 * 题4 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  // 1、未原地旋转
  // matrix.reverse()
  // let res = []
  // matrix.forEach((arr, index) => {
  //   arr.forEach((num, k) => {
  //     if (!res[k]) {
  //       res[k] = []
  //     }
  //     res[k].push(num) e
  //   })
  // })
  // res.forEach((item, n) => {
  //   item.forEach((ele, k) => {
  //     matrix[n][k] = ele
  //   })
  // })
  // return res

  // 2、未原地旋转
  // matrix.reverse()
  // matrix = matrix.reduce((pre, cur, index, arr) => {
  //   cur.map((item, k) => {
  //     if (!pre[k]) pre[k] = []
  //     pre[k].push(item)
  //   })
  //   return pre
  // }, [])

  // 3、原地 旋转图像，这意味着你需要直接修改输入的二维矩阵
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); ++i) {
    for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
      const temp = matrix[i][j];
      console.log(i, j, temp);
      console.log("temp", temp);

      matrix[i][j] = matrix[n - j - 1][i];
      console.log(" matrix[n - j - 1][i]", matrix[n - j - 1][i]);

      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      console.log("matrix[n - i - 1][n - j - 1]", matrix[n - i - 1][n - j - 1]);

      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      console.log("matrix[j][n - i - 1]", matrix[j][n - i - 1]);

      matrix[j][n - i - 1] = temp;
    }
  }

};

// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]

const matrix = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16]
]
// 5 15 16 11
// 1 13 12 10
// 2 14 7 9
// 4 3 6 8

// 规律：matrixnew[col][n−row−1]=matrix[row][col]

// 输出：
// [15, 13, 2, 5],
// [14, 3, 4, 1],
// [12, 6, 8, 9],
// [16, 7, 10, 11]
console.log(rotate(matrix))
