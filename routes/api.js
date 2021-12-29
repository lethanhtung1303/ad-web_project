var express = require('express');
var router = express.Router();
const notify = require('../models/notify');

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

module.exports = router;
