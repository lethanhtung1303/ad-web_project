var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.profile) return res.redirect('/');
    var err = req.query.err || '';
    return res.render('login', { err });
});

router.post('/', (req, res) => {
    var { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
        var idUser = email.split('@')[0];
        users
            .find({ idUser: idUser })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.redirect(
                        '/login?err=Tài khoản hoặc email không tồng tại',
                    );
                if (!bcrypt.compareSync(password, data[0].password))
                    return res.redirect('/login?err=Mật khẩu không đúng');
                req.session.profile = data[0];
                return res.redirect('/');
            });
    }
});

module.exports = router;
