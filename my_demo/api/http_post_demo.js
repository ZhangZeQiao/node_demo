// 导入http模块
var http = require("http");

// 创建 http server，并传入回调函数，回调函数接收request和response对象
http.createServer(function (request, response) {
    // 获得http请求的method和url
    console.log(request.method + ': ' + request.url);
    // 定义了一个post变量，用于暂存请求体的信息，每当接收到请求体数据，累加到post中
    var post = "";
    request.on("data", function (chunk) {
        post += chunk;
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on("end", function () {
        console.log("——————请求结束 post = " + post.toString() + "——————");
        // 将http响应200写入response, 同时设置Content-Type
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf8" });
        response.write("{code:200,msg=\"请求成功\"}");
        response.end();
    });
}).listen(8888);// 让服务器监听8888端口
console.log("——————服务器启动——————");