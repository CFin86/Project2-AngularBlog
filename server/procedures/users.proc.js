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