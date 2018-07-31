function Foo() {
  getName = function () { console.log(1); };
  return this;
};
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}

//请写出以下输出结果：
// Foo.getName();    
// getName();   
// Foo().getName();   
// getName();   
// new Foo.getName();  
// new Foo().getName();   
// new new Foo().getName();  

// 正确答案：2 4 1 1 2 3 3

function fun(n,o) {
  console.log(o)
  return {
      fun:function(m){
          return fun(m,n);
      }
  };
}
// var a = fun(0); a.fun(1); a.fun(2); a.fun(3);     //undefined,?,?,?
// var b = fun(0).fun(1).fun(2).fun(3);              //undefined,?,?,?
// var c = fun(0).fun(1); c.fun(2); c.fun(3);        //undefined,?,?,?

// 0 0 0 

// 0 1 2

// 0 1 1

// function unique(a) {
//   var res = [];
//   for (var i = 0, len = a.length; i < len; i++) {
//     console.log('i循环',i)
//     for (var j = i + 1; j < len; j++) {
//       // 这一步十分巧妙，如果发现相同元素，则 i 自增进入下一个循环比较
//       console.log('jjjj循环',j)
//       if (a[i] === a[j])
//         j = ++i;
//     }
//     console.log('ii循环',i)
//     res.push(a[i]);
//   }
//   console.log(res);
// }


// var  arr = [1,1,2,1];

// unique(arr);

function unique(a) {
  return a.sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}


var a = [1, 1, 3, 2, '1', 2, 4];
var ans = unique(a);
console.log(ans); // => [1, 2, 3, 4]

