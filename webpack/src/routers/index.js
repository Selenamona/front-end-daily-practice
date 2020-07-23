const contexts = require.context("./", false, /\.js$/)
console.log("contexts", contexts) // 返回 webpackContext 函数
console.log(contexts.keys()); //  ["./1test.js", "./2test.js", "./3.js", "./index.js"]
console.log(contexts.id); // ./src/routers sync \.js$
console.log(contexts.resolve(contexts.keys()[0])); // ./src/routers/1test.js
console.log(contexts(contexts.keys()[0])); // 返回 module 模块


 