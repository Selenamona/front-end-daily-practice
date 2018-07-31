
// 类
class Student {
  fullName:string;
  constructor(public firstName:string, public middleInitial:string, public lastName:string){
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName:string,
  lastName:string
}

function greeter(people:Person){
  return "hello " + people.firstName + " " + people.lastName;
}
let users = new Student("ccc","M","ccc");
document.documentElement.innerHTML = greeter(users); 


// 枚举
enum Color {Red=1, Green, Blue}
let c: Color = Color[1];
console.log(c);

// 变量生命
function sumMatrix(matrix: number[][]) {
  var sum = 0;
  for (var i = 0; i < matrix.length; i++) {
      var currentRow = matrix[i];
      console.log(i)
      for (var i = 0; i < currentRow.length; i++) {
        console.log(i)
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

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

// let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
// let search = { food: "rich", ...defaults };

console.log(search)