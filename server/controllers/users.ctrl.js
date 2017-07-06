var express = require("express");
var userProc = require('../procedures/users.proc');
var passport = require('passport');
var authMw = require("../middleware/auth.mw.js")
var utils = require("../config/utils.js");

var router = express.Router();


router.get("/", function (req, res) {
    return userProc.all().then(function (data) {
        res.send(data);
    }, function (err) {
        console.log(err);
        res.status(500).send(err);
    })
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { 
            console.log(err); return res.sendStatus(500);
         }
        if (!user) { 
            return res.status(401).send(info); 
        }
        req.logIn(user, function (err) {
            if (err) {
                 return res.sendStatus(500); 
            } else { 
                return res.send(user); }
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.all("*", authMw.isLoggedIn);

router.get("/", authMw.isAdmin, function(req, res){
    userProc.all().then(function(data){
        res.send(data);
    }, function(err){
        console.log(err);
        res.status(500).send(err);
    })
});

router.post("/", authMw.isAdmin, function(req, res){
    var hash = utils.encryptedPassword(req.body.password)
    userProc.write(req.body.firstname, req.body.lastname, req.body.email, hash)
    .then(function(id){
        res.send(id);
    }, function(err) {
        console.log(err);
        res.status(500).send(err);
    })
});

router.get('/me', function(req, res){
    res.send(req.user);
});

    module.exports = router;