var express = require('express');
var router = express.Router();

var dateFormat = require('dateformat');

const posts = require('../models/posts');

router.post('/', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var { idPost, contentCmt } = req.body;
    var profile = req.session.profile;
    if (idPost && contentCmt) {
        posts
            .find({ idPost: idPost })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({ code: 3, message: 'id not exist' });

                var idcmt = 'Cmt' + Date.now();
                var now = new Date();
                var dateTime = dateFormat(now, 'mm/dd/yyyy, h:MM:ss TT');
                var comment = data[0].comment;
                var newCmt = {
                    idcmt: idcmt,
                    idUser: profile.idUser,
                    name: profile.name,
                    picture: profile.picture,
                    contentCmt: contentCmt,
                    dateTime: dateTime,
                };
                comment.push(newCmt);

                posts
                    .updateOne(
                        { idPost: idPost },
                        { $set: { comment: comment } },
                    )
                    .exec();

                return res.json({ code: 0, data: newCmt });
            });
    }
});

router.get('/:idPost', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });
    var idPost = req.params.idPost;
    if (!idPost) return res.json({ code: 3, message: 'not params' });

    posts
        .find({ idPost: idPost })
        .exec()
        .then((data) => {
            var comment = data[0].comment;
            return res.json({ code: 0, data: comment });
        });
});

router.post('/edit', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var { idcmt, contentCmt, idPost } = req.body;
    var profile = req.session.profile;
    if (idcmt && contentCmt && idPost) {
        posts
            .find({ idPost: idPost })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({ code: 3, message: 'post not exist' });
                var listCmt = data[0].comment;
                var check = 0;
                listCmt.forEach((val) => {
                    if (val.idcmt === idcmt) {
                        if (val.idUser === profile.idUser) {
                            check++;
                            val.contentCmt = contentCmt;
                        }
                    }
                });
                if (check === 0)
                    return res.json({
                        code: 3,
                        message: 'cmt not exist or unauthorized',
                    });

                posts
                    .updateOne(
                        { idPost: idPost },
                        { $set: { comment: listCmt } },
                    )
                    .exec();
                return res.json({ code: 0, data: data[0] });
            })
            .catch((e) => console.log(e));
    }
});

router.delete('/delete', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var { idPost, idcmt } = req.body;
    var profile = req.session.profile;
    if (idPost && idcmt) {
        posts
            .find({ idPost: idPost })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });

                var listCmt = data[0].comment;
                var check = 0;
                if (profile.idUser === 'admin') {
                    listCmt.forEach((val, i) => {
                        if (val.idcmt === idcmt) {
                            check++;
                            listCmt.splice(i, 1);
                        }
                    });
                } else {
                    listCmt.forEach((val, i) => {
                        if (val.idcmt === idcmt) {
                            if (val.idUser === profile.idUser) {
                                check++;
                                listCmt.splice(i, 1);
                            }
                        }
                    });
                }

                if (check === 0)
                    return res.json({
                        code: 3,
                        message: 'cmt not exist or unauthorized',
                    });

                posts
                    .updateOne(
                        { idPost: idPost },
                        { $set: { comment: listCmt } },
                    )
                    .exec();
                return res.json({ code: 0, data: data[0] });
            })
            .catch((e) => console.log(e));
    }
});

module.exports = router;
