var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

const notify = require('../models/notify');
const posts = require('../models/posts');

router.get('/list-my-notify', function (req, res, next) {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });
    var profile = req.session.profile;
    notify
        .find({ idUser: profile.idUser })
        .exec()
        .then((data) => {
            return res.json({ code: 0, data: data });
        });
});

router.get('/notify-by-auths', function (req, res, next) {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var auths = req.query.auths;
    if (auths) {
        notify
            .find({ auths: auths })
            .exec()
            .then((data) => {
                return res.json({ code: 0, data: data });
            });
    }
});

router.get('/notify', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    notify
        .find({})
        .exec()
        .then((data) => {
            return res.json({ code: 0, data: data });
        });
});

router.get('/my-post', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });
    if (!req.query.idUser) return res.json({ code: 4, message: 'not params' });
    var idUser = req.query.idUser;
    posts
        .find({ idUser: idUser })
        .exec()
        .then((data) => {
            return res.json({ code: 0, data: data });
        });
});

module.exports = router;
