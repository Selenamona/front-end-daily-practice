// 拷贝第一层属性
function shallowClone(source) {
    if (!source || typeof source !== 'object') {
        return;
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            // 简单的拷贝属性
            targetObj[keys] = source[keys];
        }
    }
    return targetObj;
}
function Parent() {
  this.name = 'parent';
  this.a = 1;
}
function Child() {
  this.name = 'child';
  this.b = 2;
}

Child.prototype = new Parent();
var child1 = new Child();
// 更改 child1 的 name 属性的描述符
Object.defineProperty(child1, 'name', {
  writable: false,
  value: 'Mike'
});
// 拷贝对象
var child2 = shallowClone(child1);

// Object {value: "Nicholas", writable: false, enumerable: true, configurable: true}
// console.log(Object.getOwnPropertyDescriptor(child1, 'name')); 

// 这里新对象的 name 属性的描述符已经发生了变化
// Object {value: "Nicholas", writable: true, enumerable: true, configurable: true}
// console.log(Object.getOwnPropertyDescriptor(child2, 'name')); 

// child1.name = 'newName'; // 严格模式下报错
// child2.name = 'newName'; // 可以赋值
// console.log(child1.name); //  Mike
// console.log(child2.name); // newName


// 双向绑定原理
var obj = {};
Object.defineProperty(obj,"hello",{
    get:function(){
        console.log("get")
        return "Mona";
    },
    set:function(val){
        console.log(val,"set")
    }
})

console.log(obj.hello);
obj.hello = 'Selena';
console.log(obj.hello);