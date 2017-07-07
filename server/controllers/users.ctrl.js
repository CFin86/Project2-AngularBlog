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
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.all("*", authMw.isLoggedIn);

router.get("/", authMw.isAdmin, function (req, res) {
    userProc.all().then(function (data) {
        res.send(data);
    }, function (err) {
        console.log(err);
        res.status(500).send(err);
    })
})

.post(authMw.isAdmin, function (req, res) {
    utils.encryptPassword(req.body.password).then(function (hash){
        userProc.write(req.body.firstname, req.body.lastname, req.body.email, hash)
            .then(function (id) {
                res.send(id);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
                })
    })
})
    
router.get('/me', function (req, res) {
    res.send(req.user);
});

router.route("/:id")
    .get(authMw.isAdmin, function(req, res){
        userProc.read(req.params.id).then(function(data){
            res.send(data);
        }, function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })

    .put(authMw.isAdmin, function (req, res) {
        userProc.updateEmail(req.params.id, req.body.email).then(function(){
            if(req.body.password){
                    utils.encryptPassword(req.body.password).then(function(hash){
                        userProc.updatePassword(req.params.id, hash).then(function(){
                            res.sendStatus(204);
                        })
                    })
                } else{
                    res.sendStatus(204)
                }
        })
    })
        .delete(authMw.isAdmin, function (req, res) {
             userProc.delete(req.params.id).then(function(){
                 res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    })


module.exports = router;