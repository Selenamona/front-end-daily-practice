



// http 服务器

const http = require('http');
const hostname = '192.168.157.1';
const port = 133;
const server = http.createServer((req, res) => {
res.statusCode = 200;
  
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
  console.log("服务器启动成功")
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// var http = require('http');//引入 http 模块
// var url = require('url');
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

//创建 http server，并传入回调函数:
// var server = http.createServer(function(req,res){
//     /*
//         req 用来接受客户端数据
//         res 用来向客户端发送服务器数据
//     */ 
//     console.log(req.method + "" + req.url);//获取 http 请求的 method 和 url
//     //将HTTP响应200写入response，连接成功后向客户端写入头信息
//     res.writeHeader(200,{ 
//         'content-type' : 'text/html;charset="utf-8"'
//     });
//     res.write('这是正文部分');//显示给客户端
//     res.end();
// }).listen(80); // 监听端口号
// console.log('Server is running at http://127.0.0.1:80/');

// 文件服务器
// var
//     fs = require('fs'),
//     url = require('url'),
//     path = require('path'),
//     http = require('http');

// // 从命令行参数获取root目录，默认是当前目录:
// var root = path.resolve(process.argv[2] || '.');
// console.log('Static root dir: ' + root);
// console.log(11)


// // 创建服务器:
// var server = http.createServer(function (request, response){

// // 获得URL的path，类似 '/css/bootstrap.css':
// var pathname = url.parse(request.url).pathname;

// // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
// var filepath = path.join(root, pathname);

// // 获取文件状态:
// fs.stat(filepath, function (err, stats) {if (!err && stats.isFile()) {

// // 没有出错并且文件存在:
// console.log('200 ' + request.url);



// // 发送200响应:
// response.writeHead(200);

// // 将文件流导向response:
// fs.createReadStream(filepath).pipe(response);
//     } else {

// // 出错了或者文件不存在:
// console.log('404 ' + request.url);

// // 发送404响应:
// response.writeHead(404);
// response.end('404 Not Found');
//         }
//     });
// });

// server.listen(8080);

// console.log('Server is running at http://127.0.0.1:8080/');