
var express = require('express');
var postCtrl = require("./controllers/posts.ctrl");
var usersCtrl = require("./controllers/users.ctrl");
var catCtrl =require('./controllers/categories.ctrl');

var router = express.Router();

router.use('/posts', postCtrl);
router.use('/users', usersCtrl);
router.use('/categories', catCtrl);

module.exports = router;