var db = require("../db");
//GET ALL CHIRPS FROM THE DATABASE
exports.all = function() {
    return db.rows("GetAllChirps", []);
}
//GET A SINGLE CHIRP FROM THE DATABASE
exports.read = function(id) {
    return db.row("GetSingleChirp", [id]);
}
//ADD A NEW CHIRP TO THE DATABASE
exports.write = function(message, userId) {
    return db.row("InsertChirp", [message, userId]);
}
//UPDATE AN EXISTING CHIRP'S MESSAGE IN THE DATABASE
exports.update = function(id, message) {
    return db.empty("UpdateChirp", [id, message]);
}
//DELETE AN EXISTING CHIRP FROM THE DATABASE
exports.destroy = function(id) {
    return db.empty("DeleteChirp", [id]);
}