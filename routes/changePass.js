var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var mess = '';
    if (req.query.mess) mess = req.query.mess;
    var content = '../pages/changePass';
    return res.render('layouts/main', { profile, content, mess });
});

router.post('/', (req, res) => {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var newPassword = req.body.password;
    var rePassword = req.body.rePassword;

    if (rePassword == newPassword) {
        if (newPassword) {
            users
                .updateOne(
                    { idUser: profile.idUser },
                    { $set: { password: bcrypt.hashSync(newPassword, 10) } },
                )
                .exec();
            return res.redirect('/changePass?mess=success');
        }
    }
    return res.redirect('/changePass?mess=fail');
});

module.exports = router;
