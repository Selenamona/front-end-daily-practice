// var fs = require("fs");
// // 同步
// var data = fs.readFileSync("input.txt");
// console.log(data.toString());
// console.log("程序执行结束！");
// // 异步
// fs.readFile('input.txt',function(err,data){
//   if(err) return console.error(err);
//   console.log(data.toString());
// })
// console.log("程序执行结束！");

var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
    res.end(util.inspect(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash', true)));
}).listen(3000);
