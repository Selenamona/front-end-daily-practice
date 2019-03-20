// 30 second of code
// -----------------------Array-----------------------]
var arr = [1,2,3,4,5];
var arr2 = ["a","b","c","d","e"];
// Array.prototype.every();   返回值：布尔值
// array.every(function(currentValue,index,arr), thisValue)
// every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。
// every() 方法使用指定函数检测数组中的所有元素：
// 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
// 如果所有元素都满足条件，则返回 true。
// 注意： every() 不会对空数组进行检测。
// 注意： every() 不会改变原始数组。

var ls = arr2.every((val)=>{
    return val !== "A";
})
// console.log(arr2,ls);  // ["a","b","c","d","e"] true

const all = (arr, fn = Boolean) => arr.every(fn);
console.log(all(arr,x=>x>1));  // false
console.log(all(arr));  // true


// JavaScript Array some()  返回值：布尔值
// some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
// some() 方法会依次执行数组的每个元素：
// 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
// 如果没有满足条件的元素，则返回false。
// 注意： some() 不会对空数组进行检测。
// 注意： some() 不会改变原始数组。