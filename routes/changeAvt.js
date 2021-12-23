var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: './public/images' });

const users = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    var content = '../pages/changeAvt';
    return res.render('layouts/main', { profile, content });
});

router.post('/', upload.single('picture'), (req, res) => {
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
                return res.redirect('/changeAvt');
            })
            .catch((err) => console.log(err));
    }, 500);
});

module.exports = router;
