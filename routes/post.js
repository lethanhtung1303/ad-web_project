var express = require('express');
var router = express.Router();

const posts = require('../models/posts');

router.get('/', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });
    posts
        .find({})
        .exec()
        .then((data) => {
            return res.json({ code: 0, data });
        });
});

router.post('/', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var { content, link } = req.body;
    var profile = req.session.profile;

    if (content) {
        var idPost = 'P' + Date.now();
        posts
            .find({ idPost: idPost })
            .exec()
            .then((data) => {
                if (data.length)
                    return res.json({
                        code: 3,
                        message: 'id post exist, please try again',
                    });
                var date = new Date();
                var dateTime =
                    date.getUTCFullYear() +
                    '/' +
                    ('0' + (date.getUTCMonth() + 1)).slice(-2) +
                    '/' +
                    ('0' + date.getUTCDate()).slice(-2) +
                    ' ' +
                    ('0' + date.getUTCHours()).slice(-2) +
                    ':' +
                    ('0' + date.getUTCMinutes()).slice(-2) +
                    ':' +
                    ('0' + date.getUTCSeconds()).slice(-2);
                var newPost = new posts({
                    idPost: idPost,
                    idUser: profile.idUser,
                    name: profile.name,
                    picture: profile.picture,
                    content: content,
                    link: link,
                    comment: [],
                    dateTime: dateTime,
                });
                newPost.save();
                return res.json({ code: 0, data: newPost });
            });
    }
});

router.delete('/delete', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var { idPost } = req.body;
    var profile = req.session.profile;
    if (idPost) {
        posts
            .find({ idPost: idPost })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });
                if (
                    data[0].idUser !== profile.idUser &&
                    profile.idUser !== 'admin'
                )
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });

                posts.deleteOne({ idPost: idPost }).exec();
                return res.json({ code: 0, data: data[0] });
            })
            .catch((e) => console.log(e));
    }
});

router.post('/edit', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var { idPost, content, link } = req.body;
    var profile = req.session.profile;
    if (idPost) {
        posts
            .find({ $and: [{ idPost: idPost }, { idUser: profile.idUser }] })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });

                posts
                    .updateOne(
                        { idPost: idPost },
                        { $set: { content: content, link: link } },
                    )
                    .exec();
                return res.json({ code: 0, data: data[0] });
            })
            .catch((e) => console.log(e));
    }
});

module.exports = router;
