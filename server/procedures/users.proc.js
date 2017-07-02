var db = require("../db");

exports.all = function() {
    return db.rows("GetUsers", []);
}