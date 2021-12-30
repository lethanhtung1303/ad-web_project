var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');

const upload = multer({ dest: './public/images' });

const users = require('../models/users');

/* GET home page. */
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    return res.redirect('/login');
});

router.get('/changePass', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var mess = '';
    if (req.query.mess) mess = req.query.mess;
    var content = '../pages/changePass';
    return res.render('layouts/main', { profile, content, mess });
});

router.post('/changePass', (req, res) => {
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
            return res.redirect('/auth/changePass?mess=success');
        }
    }
    return res.redirect('/auth/changePass?mess=fail');
});

router.get('/changeAvt', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    var content = '../pages/changeAvt';
    return res.render('layouts/main', { profile, content });
});

router.post('/changeAvt', upload.single('picture'), (req, res) => {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    var picture = req.file;
    console.log(picture);
    //fs.unlinkSync(profile.picture)
    fs.renameSync(
        './public/images/' + picture.filename,
        './public/images/' + picture.originalname,
    );
    users
        .updateOne(
            { idUser: profile.idUser },
            { $set: { picture: '/images/' + picture.originalname } },
        )
        .exec();
    setTimeout(() => {
        users
            .find({ idUser: profile.idUser })
            .exec()
            .then((data) => {
                req.session.profile = data[0];
                return res.redirect('/auth/changeAvt');
            })
            .catch((err) => console.log(err));
    }, 500);
});

router.get('/profile', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var mess = '';
    if (req.query.mess) mess = req.query.mess;
    var content = '../pages/profile';
    return res.render('layouts/main', { profile, content, mess });
});

router.post('/profile', (req, res) => {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    var { myName, gender, classroom, faculty } = req.body;

    if (myName && gender && faculty && classroom) {
        users
            .updateOne(
                { idUser: profile.idUser },
                {
                    $set: {
                        name: myName,
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
                    return res.redirect('/auth/profile?mess=success');
                })
                .catch((err) => console.log(err));
        }, 500);
    }
});

module.exports = router;
