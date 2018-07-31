"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 类
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(people) {
    return "hello " + people.firstName + " " + people.lastName;
}
var users = new Student("ccc", "M", "ccc");
document.documentElement.innerHTML = greeter(users);
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color[1];
console.log(c);
// 变量生命
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        console.log(i);
        for (var i = 0; i < currentRow.length; i++) {
            console.log(i);
            sum += currentRow[i];
        }
    }
    return sum;
}
// console.log(sumMatrix([[1,2,3],[4,5,6]])); // 0 0 1 2 6
// for (var i = 0; i < 10; i++) {
//   setTimeout(function() { console.log(i); }, 100 * i);
// } 
// 10 10 10 10 10 10 10 10 10 10 
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign({}, defaults, { food: "rich" });
// let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
// let search = { food: "rich", ...defaults };
console.log(search);
