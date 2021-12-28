var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');
const notify = require('../models/notify');

/* GET users listing. */

router.post('/', (req, res) => {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    if (profile.position !== 0 && profile.position !== 2)
        return res.json({ code: 2, message: 'unauthorized' });
    var { content, auths, tittle } = req.body;
    var idNotify =
        'A' + String(Math.floor(Math.random() * (999999 - 100000)) + 100000);
    notify
        .find({ idNotify: idNotify })
        .exec()
        .then((data) => {
            if (data.length)
                return res.json({
                    code: 3,
                    message: 'id post exist, please try again',
                });

            var date = new Date();
            var dateTime =
                date.getFullYear().toString() +
                '-' +
                (date.getMonth() + 1).toString() +
                '-' +
                date.getDate().toString();

            var newAnnounce = new notify({
                idNotify: idNotify,
                idUser: profile.idUser,
                name: profile.name,
                picture: profile.picture,
                tittle: tittle,
                content: content,
                dateTime: dateTime,
                auths: parseInt(auths),
            });
            newAnnounce.save();
            return res.json({'code': 0, 'data': newAnnounce})
        })
        .catch((err) => console.log(err));
    /*return res.redirect('/');*/
});

module.exports = router;