var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var content = '../pages/index';
    res.render('layouts/main', { content });
});

module.exports = router;
