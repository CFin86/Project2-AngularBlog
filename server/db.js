var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "bloguser",
    password: "xxx",
    database: "AngularBlog"
});