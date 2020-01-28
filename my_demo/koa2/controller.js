// fs模块用于对系统文件及目录进行读写操作
const fs = require('fs');

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        console.log('url:' + url);
        /* 
        {
          'GET /': [AsyncFunction: fn_index],
          'POST /signin': [AsyncFunction: fn_signin]
        }
        url:GET /
        url:POST /signin

        { 'GET /hello/:name': [AsyncFunction: fn_hello] }
        url:GET /hello/:name
        */
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            // TODO: router.get有两个参数，一个为path，一个为中间件middleware
            // 中间件middleware为fs读取到的文件中module.exports导出的映射mapping
            // 再通过mapping[url]直接定位到module.exports导出的众多对象中的某一个
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    // TODO: 自带全局变量 __filename、__dirname
    // __dirname:c:\Android\VSCodeProjects\node_demo\my_demo\koa2
    // console.log('__dirname:' + __dirname);
    fs.readdirSync(__dirname + '/' + dir)
        // 返回满足回调函数中指定条件的数组元素。
        .filter((f) => {
            return f.endsWith('.js');
        }).forEach((f) => {
            console.log(`process controller: ${f}...`);
            let mapping = require(__dirname + '/' + dir + '/' + f);
            addMapping(router, mapping);

            console.log(__dirname + '/' + dir + '/' + f);
            console.log(mapping);

            /* 
            c:\Android\VSCodeProjects\node_demo\my_demo\koa2/controllers/hello.js
            { 'GET /hello/:name': [AsyncFunction: fn_hello] }
            
            c:\Android\VSCodeProjects\node_demo\my_demo\koa2/controllers/index.js
            {
              'GET /': [AsyncFunction: fn_index],
              'POST /signin': [AsyncFunction: fn_signin]
            }
              */

        });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};