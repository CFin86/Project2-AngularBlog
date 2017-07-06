//cmf
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var routeMW = require("./middleware/route.mw")
var clientPath = path.join(__dirname, '../client');
var cookieParser = require("cookie-parser");
var configurePassport = require("./config/passport");
var api = require('./api');
var utils = require('./config/utils.js')

var app = express();

var userProc = require("./procedures/users.proc");

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());

configurePassport(app);
//
// userProc.all().then(function (users) {
//     users.forEach(function (user) {
//         console.log("Updating password for user " + user.firstname);
//         utils.encryptPassword(user.password).then(function (hash) {
//             userProc.updatePw(user.id, hash).then(function () {
//                 console.log("Successfully updated the password for" + user.id)
//             })
//         })
//     });
// });

app.use('/api', api);

app.get("*", function (req, res, next) {
    if (routeMW.isAsset(req.url)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, "../client/index.html"));
    }
})

app.listen(3000);