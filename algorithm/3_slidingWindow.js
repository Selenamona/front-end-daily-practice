/**
 * 3、滑动窗口问题：无重复字符的最长子串。给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。
 * 输入: "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 */

/**
 * substr 和 substring的区别：
 * 相同点：如果只是写一个参数，两者的作用都一样：都是是截取字符串从当前下标以后直到字符串最后的字符串片段。
 * 不同点：第二个参数
 * substr（startIndex,lenth）： 第二个参数是截取字符串的长度（从起始点截取某个长度的字符串）；
 * substring（startIndex, endIndex）： 第二个参数是截取字符串最终的下标 （截取2个位置之间的字符串,‘含头不含尾’）
 */

lengthOfLongestSubstring("pwwkew");
// lengthOfLongestSubstring("dvdf");

// 尝试3-错误
function lengthOfLongestSubstring(s) {
  let max = 0,
    index = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    index = s.substr(i, j).indexOf(s[j]);
    if (index !== -1) {
      i = i + index + 1;
    }
    max = Math.max(max, j - i + 1);
  }
  console.log(max);
  return max;
}

// 尝试3-正确
function lengthOfLongestSubstring2(s) {
  let index = 0,
    max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    index = s.substring(i, j).indexOf(s[j]);
    if (index !== -1) {
      i = i + index + 1;
    }
    max = Math.max(max, j - i + 1);
  }
  console.log(max);
  return max;
}

// 尝试2
// function lengthOfLongestSubstring(s) {
//   let arr = [];
//   let max = 0;
//   for (let i = 0; i < s.length; i++) {
//     let index = arr.indexOf(s[i]);
//     if (index !== -1) {
//       arr.splice(0, index + 1); // 从数组开头到当前字符串全部截取掉
//     }
//     arr.push(s.charAt(i)); // 在窗口右边放进新的字符
//     max = Math.max(arr.length, max); // 更新最大值
//   }
//   return max;
// }

// 尝试1
// var lengthOfLongestSubstring = function (s) {
//   let str = "";
//   let arr = [];
//   for (let i = 0; i < s.length; i++) {
//     const index = str.indexOf(s[i]);
//     if (index > -1) {
//       arr.push(str);
//       str = str.substr(index + 1, str.length);
//       str += s[i];
//     } else {
//       str += s[i];
//     }
//   }
//   arr.push(str);
//   let longStr = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i].length > longStr.length) {
//       longStr = arr[i];
//     }
//   }
//   console.log(arr, longStr);
//   return longStr.length;
// };
