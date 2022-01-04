var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    var content = '../pages/index';
    return res.render('layouts/main', { profile, content });
});

module.exports = router;
