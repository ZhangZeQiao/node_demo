// 导入http模块
var http = require("http");

// 创建 http server，并传入回调函数，回调函数接收request和response对象
http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf8" });
    response.write("哈哈哈");
    response.end();
}).listen(8888);// 让服务器监听8888端口
console.log("——————服务器启动——————");