var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var content = '../pages/myNotify';
    res.render('layouts/main', { content });
});

module.exports = router;
