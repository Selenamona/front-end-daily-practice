	// 数组操作
	// <!-- 截取和清空数组 -->

	var arr = [12, 222, 44, 88];
	// arr.length = 2;  
	// console.log(arr)  //截取，arr = [12, 222];  
    // arr.length = 0;  
    // console.log(arr)  //清空，arr will be equal to [].
    arr[arr.length] = 6;   //插
    // console.log(arr)

    // 获取数组的最大最小值	
    var numbers = [5, 45822, 120, -215];
    var maxInNumbers = Math.max.apply(Math, numbers);   //45822
    var minInNumbers = Math.min.apply(Math, numbers);   //-215
    Math.max(...[14, 3, 77])
    Math.min(...[14, 3, 77])
    // console.log(maxInNumbers,minInNumbers)

    // 数组去重
    var arr =[1,2,3,"s","a",3,"a"];
    var newArr1 = [...new Set(arr)];
    var newArr2 = Array.from(new Set(arr));
    // console.log(newArr1)
    // var arr = [1,2,3,2,1,3,{"a":1,"b":2},{"a":2},{"a":2}];
    // var unique = function(arr) {   //对象键值对法
    //     var result = [], json = {};
    //     for (var i = 0, len = arr.length; i < len; i++){
    //         console.log(arr[i])
    //         if (!json[arr[i]]) {
    //             json[arr[i]] = 1;
    //             result.push(arr[i]);  //返回没被删除的元素
    //         }
    //     }
    //     return result;
    // };
    // console.log(unique(arr))

    // 浮点数计算问题
    0.1 + 0.2 == 0.3   //false
    // console.log((0.1+0.2).toFixed(1))      //toPrecision()

    var arr = [1, 5, 6, 3];    //数字数组
    arr.sort(function(a, b) {
        // return a - b;   //从小到大排
        // return b - a;   //从大到小排
        return Math.random() - 0.5;   //数组洗牌
    });
    // console.log(arr)
    var arr = [{   //对象数组
        num: 1,
        text: 'num1'
        }, {
        num: 5,
        text: 'num2'
        }, {
        num: 6,
        text: 'num3'
        }, {
        num: 3,
        text: 'num4'
    }];   
    arr.sort(function(a, b) {
        // return a.num - b.num;   //从小到大排
        return b.num - a.num;   //从大到小排
    });
    // console.log(arr)



    // console.log(([][[]]+[])[+!![]]+([]+{})[!+[]+!![]])    //]


    //Q&&A    下面的代码会在 console 输出神马？

    (function(){
    var a = b = 3;
    })();
    
    // console.log("a defined? " + (typeof a !== 'undefined')); 
    // console.log("b defined? " + (typeof b !== 'undefined'));

    var foo = { n: 1 };
    var bar = foo;
    foo.x = foo = { n: 2 };
    // console.log(bar);

    var a={},
    b={key:'b'},
    c={key:'c'};
    a[b]=123;
    a[c]=456;
    // console.log(a[b]);

    function fun(n,o) {
        // console.log(o)
        return {
            fun:function(m){
                return fun(m,n);
            }
        };
    }
    var a = fun(0); a.fun(1); a.fun(2); a.fun(3); 
    var b = fun(0).fun(1).fun(2).fun(3);
    var c = fun(0).fun(1); c.fun(2); c.fun(3);

    // var val = 0;
    // console.log(window)
    // Object.defineProperty(window,'a',{
    //     get: function() {
    //         return ++val;
    //     }
    // });
    // if (a == 1 && a == 2 && a == 3) {
    //     console.log('yay');
    // }

    // var aﾠ = 1;
    // var a = 2;
    // var ﾠa = 3;
    // if(aﾠ==1 && a== 2 &&ﾠa==3) {
    //     console.log("Why hello there!")
    // }

    // const a = {
    //     i: 1,
    //     toString: function () {
    //         return a.i++;
    //     }
    // }
    // if(a == 1 && a == 2 && a == 3) {
    //     console.log('Hello World!');
    // }






// 写一个函数，接收一个数字，输出这个数字里面所有相邻数相加等于这个数字的，例如  
// 15=1+2+3+4+5
// 15=4+5+6
// 15=8+7
// 有时间大家开动一下脑筋

// 16 = 7+9
// 16 = 

    // function fn(n){
        
    // }

    // fn(15)

