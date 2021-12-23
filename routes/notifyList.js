var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var profile = req.session.profile;
    var content = '../pages/notifyList';
    return res.render('layouts/main', { profile, content });
});

module.exports = router;
