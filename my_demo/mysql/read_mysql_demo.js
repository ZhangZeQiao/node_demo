// TODO: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// https://blog.csdn.net/qq_28004379/article/details/84652593
// mysql>alter user 'root'@'localhost' identified with mysql_native_password by '******';
// mysql>flush privileges;

var mysql = require("mysql");

var connection = mysql.createConnection({
    hose: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "zzq_demo",
});

connection.connect();
connection.query("select * from user", (err, results, fields) => {
    console.log(results);
});