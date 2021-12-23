var express = require('express');
var router = express.Router();

const users = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var mess = '';
    if (req.query.mess) mess = req.query.mess;
    var content = '../pages/profile';
    return res.render('layouts/main', { profile, content, mess });
});

router.post('/', (req, res) => {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var { gender, classroom, faculty } = req.body;

    if (gender && faculty && classroom) {
        users
            .updateOne(
                { idUser: profile.idUser },
                {
                    $set: {
                        gender: gender,
                        faculty: faculty,
                        classroom: classroom,
                    },
                },
            )
            .exec();
        setTimeout(() => {
            users
                .find({ idUser: profile.idUser })
                .exec()
                .then((data) => {
                    req.session.profile = data[0];
                    return res.redirect('/profile?mess=success');
                })
                .catch((err) => console.log(err));
        }, 500);
    }
});

module.exports = router;
