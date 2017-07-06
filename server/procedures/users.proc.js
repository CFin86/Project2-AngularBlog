var db = require("../config/db.js");

exports.all = function() {
    return db.rows("GetAllUsers", []);
}

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.read = function(id) {
	return db.row('GetSingleUser', [id]);
}

exports.write= function(first, last, email, password) {
    return db.row("CreateUser", [first, last, email, password]);
}

exports.updatePw = function(id, hash) {
    return db.empty("UpdatePassword", [id, hash]);
}