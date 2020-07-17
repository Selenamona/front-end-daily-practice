"use strict";
// // 类
// class Student {
//   fullName:string;
//   constructor(public firstName:string, public middleInitial:string, public lastName:string){
//       this.fullName = firstName + " " + middleInitial + " " + lastName;
//   }
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// interface Person {
//   firstName:string,
//   lastName:string
// }
// function greeter(people:Person){
//   return "hello " + people.firstName + " " + people.lastName;
// }
// let users = new Student("ccc","M","ccc");
// document.documentElement.innerHTML = greeter(users); 
// // 枚举
// enum Color {Red=1, Green, Blue}
// let c: Color = Color[1];
// console.log(c);
// // 变量生命
// function sumMatrix(matrix: number[][]) {
//   var sum = 0;
//   for (var i = 0; i < matrix.length; i++) {
//       var currentRow = matrix[i];
//       console.log(i)
//       for (var i = 0; i < currentRow.length; i++) {
//         console.log(i)
//           sum += currentRow[i];
//       }
//   }
//   return sum;
// }
// // console.log(sumMatrix([[1,2,3],[4,5,6]])); // 0 0 1 2 6
// // for (var i = 0; i < 10; i++) {
// //   setTimeout(function() { console.log(i); }, 100 * i);
// // } 
// // 10 10 10 10 10 10 10 10 10 10 
// let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
// let search = { ...defaults, food: "rich" };
// // let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
// // let search = { food: "rich", ...defaults };
// // console.log(search)
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee;
}(Person));
var howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误
