import { log } from "util";

// ES10
// 一. BigInt - 任意精度整数---------------------------
const b = 1n; // 追加n来创建一个BigInt
// console.log(b);
var limit = Number.MAX_SAFE_INTEGER; 
// console.log(limit);  // 9007199254740991
limit += 1;
// console.log(limit);  // 9007199254740992
limit += 2;
// console.log(limit);  // 9007199254740992
const larger = BigInt(9007199254740991)
// console.log(larger);
const integer = BigInt("9007199254740991")
// console.log(integer);

// 二: string.prototype.matchAll()---------------------

var string = "hello";
var matches = string.match("l");
// console.log(matches[0]); // "l"
const string1 = 'black*raven lime*parrot white*seagull';
const regex = /(?<color>.*?)*(?<bird>[a-z0-9]+)/g;
// console.log(regex.exec(string1));

// Array.flat() Array.flatMap() - 扁平化多维数组
let multi = [1,2,3,[4,5,6,[7,8,9[10,11,12]]]] 
// multi.flat(Infinity); // [1,2,3,4,5,6,7,8,9,10,11,12]
// console.log(multi);

var arr = [1,2,3,4,5];
arr.map(x=>[x,x*2]);

// console.log(arr);
var greeting = "   hello ";
// greeting.trimStart(); 
// console.log(greeting.trimStart());
// greeting.trimEnd(); 
// console.log(greeting.trimEnd());


var fruit = [
    { name:"apple", count: 13 },
    { name:"orange", count: 12 },
    { name:"pear", count: 11 },
    { name:"banana", count: 11 },
    { name:"cherry", count: 12 },
    { name:"pineapple", count: 10 },
];

var my_sort = (a,b)=>a.count - b.count;
var fruitSorted = fruit.sort(my_sort);
// console.log(fruitSorted);


console.log(function fn(params) { console.log(111); }.toString());


