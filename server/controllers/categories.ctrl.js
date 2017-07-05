var express = require("express");
var catProc = require("../procedures/categories.proc");

var router = express.Router();

router.get('/', function (req, res){
    catProc.all().then(function(data) {
        res.send(data);
    }, function(err) {
        console.log(err);
        res.status(500).send(err);
    })
})

module.exports = router;