var express = require('express');
var router = express.Router();
const users = require('../models/users');

router.get('/', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    if (profile.position !== 0) return res.redirect('/login');

    var content = '../pages/deptList';

    users
        .find({ position: 2 })
        .exec()
        .then((data) => {
            // if(req.query.mess)
            //     mess = req.query.mess
            var mess = req.query.mess || '';
            return res.render('layouts/main', { profile, mess, content, data });
        })
        .catch((e) => console.log(e));
});
module.exports = router;
