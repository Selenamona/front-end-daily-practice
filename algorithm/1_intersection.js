// 1、查找表问题：给定两个数组，编写一个函数来计算它们的交集
// 说明：输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。可以不考虑输出结果的顺序。
// 输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2,2]
// 示例 2:
// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [4,9]

var nums1 = [1, 2, 2, 1],
  nums2 = [2, 2];
// var nums1 = [4, 9, 9, 9, 5],
//   nums2 = [9, 4, 9, 8, 4];

// fn2(nums1, nums2);

// 尝试2.正确
function fn2(nums1, nums2) {
  const sameNums = nums => {
    const obj = {};
    nums.forEach(k => {
      if (obj[k]) {
        obj[k]++;
      } else {
        obj[k] = 1;
      }
    });
    return obj;
  };
  // 分别计算每个数组相同元素的个数
  const obj1 = sameNums(nums1);
  const obj2 = sameNums(nums2);
  let arr = [];
  for (const key in obj1) {
    // 获取交集
    if (obj2[key]) {
      const minLength = Math.min(obj1[key], obj2[key]); // 计算交集元素在两个数组中出现次数的最小值
      const newArr = new Array(minLength).fill(Number(key)); // 创建最小值个数的相同项数组
      arr = arr.concat(newArr);
    }
  }
  return arr;
}

// 尝试1.出现次数错误
function fn1(nums1, nums2) {
  const arr = [];
  nums1.forEach(element => {
    if (nums2.includes(element)) {
      arr.push(element);
    }
  });
  console.log(arr);
  return arr;
}
