//wed july 5th
var express= require('express');
var authMw = require("../middleware/auth.mw.js")
var postProc = require("../procedures/posts.proc.js")

var router = express.Router();

router.get("*", authMw.isLoggedIn);

router.route('/')
.get(function(req, res) {
    postProc.all().then(function(data){
 res.send(data);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        });
    })
    .post(function(req, res) {
        postProc.write(req.body.title, req.body.categoryId, req.body.userId, req.body.content)
         .then(function(data) {
             res.status(201).send(data);
         }, function(err) {
             console.log(err);
             res.status(500).send(err);
         })
    })

router.route('/:id')
    .get(function(req, res) {
        postProc.read(req.params.id).then(function(data) {
            res.send(data);
        }, function(err) {
             console.log("Error is here 34");
            console.log(err);
            res.status(500).send(err);
        })
    })
    .put(function(req, res) {
        postProc.update(req.params.id, req.body.title, req.body.categoryId, req.body.content)
            .then(function() {
                 console.log("Error is here 44");
                res.sendStatus(204);
            }, function(err) {
                
                console.log(err);
                res.status(500).send(err);
            })
    })
    .delete(function(req, res) {
        postProc.delete(req.params.id).then(function() {
            res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    })

module.exports = router;