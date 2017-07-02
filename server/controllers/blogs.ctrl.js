//has not been touched
var express = require("express");
var procedures = require("../procedures/blogs.proc");

var router = express.Router();

//HTTP://LOCALHOST:3000/API/CHIRPS/
router.route("/")
    .get(function (req, res) {
        return procedures.all().then(function (success) {
            res.send(success);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        })
    })
    .post(function (req, res) {
        return procedures.write(req.body.message, req.body.userId)
        .then(function (data) {
            res.status(201).send(data);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
//HTTP://LOCALHOST:3000/API/CHIRPS/:ID
router.route("/:id")
    .get(function(req, res) {
        return procedures.read(req.params.id).then(function(success) {
            res.send(success);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    })
    .put(function(req, res) {
        return procedures.update(req.params.id, req.body.message).then(function() {
            res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    })
    .delete(function(req, res) {
        return procedures.destroy(req.params.id).then(function() {
            res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    })

module.exports = router;
