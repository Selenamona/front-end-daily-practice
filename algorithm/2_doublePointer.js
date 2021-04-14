// 2、双指针问题：最接近的三数之和-16
// 说明：给定一个包括 n 个整数的数组  nums  和 一个目标值  target。找出  nums  中的三个整数，使得它们的和与  target  最接近。
// 返回这三个数的和。假定每组输入只存在唯一答案。
// 示例：
// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let sum = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 1; i++) {
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (Math.abs(total - target) < Math.abs(sum - target)) {
        sum = total;
      }
      if (total < target) {
        left++;
      } else if (total > target) {
        right--;
      } else {
        return total;
      }
    }
  }
  console.log(sum);
  return sum;
};
// var threeSumClosest = function (nums, target) {
//   nums.sort((a, b) => a - b);
//   let sum,
//     min = Infinity;
//   for (let i = 0; i < nums.length - 2; i++) {
//     let left = i + 1,
//       right = nums.length - 1;
//     while (left < right) {
//       const total = getSum([nums[i], nums[left], nums[right]]);
//       let diff = Math.abs(total - target);
//       if (diff < min) {
//         min = diff;
//         sum = total;
//       }
//       if (total < target) {
//         left++;
//       } else if (total > target) {
//         right--;
//       } else {
//         return total;
//       }
//     }
//   }
//   function getSum(nums) {
//     return nums.reduce((sum, num) => sum + num, 0);
//   }
//   return sum;
// };

threeSumClosest([-1, 2, 1, -4], 1);
