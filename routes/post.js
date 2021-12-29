var express = require('express');
var router = express.Router();

var dateFormat = require('dateformat');

const posts = require('../models/posts');

// Trả về tất cả bài viết
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

router.get('/me', function (req, res, next) {
    var profile = req.session.profile;
    var content = '../pages/myPost';
    return res.render('layouts/main', { profile, content });
});

// tạo mới 1 bài viết
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
                var now = new Date();
                var dateTime = dateFormat(
                    now,
                    'dddd, mmmm dS, yyyy, h:MM:ss TT',
                );
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

router.post('/comment', (req, res)=>{
    if(!req.session.profile)
        return res.json({'code': 2, 'message': 'please login'})

    var {idPost, contentCmt} = req.body
    var profile = req.session.profile
    if(idPost && contentCmt){
        posts.find({"idPost": idPost}).exec()
        .then(data => {         
            if(!data.length)
                return res.json({'code': 3, 'message': 'id not exist'})
        
            var idcmt = "Cmt" + String(Math.floor(Math.random() * (999999 - 100000)) + 100000)    
            var date = new Date();
            var dateTime = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()    
            var comment = data[0].comment
            var newCmt = {
                    idcmt : idcmt,
                    idUser : profile.idUser,
                    name : profile.name,
                    picture : profile.picture,
                    contentCmt : contentCmt,
                    dateTime : dateTime
                }
            comment.push(newCmt)

            posts.updateOne({"idPost": idPost}, {"$set":{"comment" : comment}}).exec()

            return res.json({'code': 0, 'data': newCmt})
        })
    }
    

})

router.get('/getComment/:idPost', (req, res)=>{
    if(!req.session.profile)
        return res.json({'code': 2, 'message': 'please login'})
    var idPost = req.params.idPost
    if(!idPost)
        return res.json({'code': 3, 'message': 'not params'})

    posts.find({"idPost":idPost}).exec()
        .then(data => {     
            var comment = data[0].comment    
            return res.json({'code': 0, 'data': comment})
        })
})

// router.get('/postsByIdUser', (req, res)=>{
//     if(!req.session.profile)
//         return res.json({'code': 2, 'message': 'please login'})

//     if(!req.query.idUser)
//         return res.redirect('/')

//     var profile = req.session.profile

//     var content = '../pages/specificUsersPosts'
//     return res.render('layouts/main', {profile, content})
// })

// router.get('/getPostsByIdUser', (req, res)=>{
//     if(!req.session.profile)
//         return res.json({'code': 2, 'message': 'please login'})
//     if(!req.query.idUser)
//         return res.json({'code': 4, 'message': 'not params'})
//     var idUser = req.query.idUser    
//     posts.find({"idUser" : idUser}).exec()
//         .then(data => {         
//             return res.json({'code': 0, 'data': data})
//         })

// })

module.exports = router;
