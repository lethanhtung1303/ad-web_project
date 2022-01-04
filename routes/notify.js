var express = require('express');
var router = express.Router();
const topic = require('../models/topic');
const notify = require('../models/notify');

var dateFormat = require('dateformat');

/* GET notify listing. */

router.get('/topic', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/');

    var profile = req.session.profile;
    var content = '../pages/notifyTopic';

    topic
        .find({})
        .exec()
        .then((data) => {
            data.reverse();
            return res.render('layouts/main', { profile, content, data });
        })
        .catch((err) => console.log(err));
});

router.get('/topic/list', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/');

    if (!req.query.auths) return res.redirect('/notify/topic');
    var profile = req.session.profile;
    var content = '../pages/notifyListTopic';

    return res.render('layouts/main', { profile, content });
});

router.get('/list', function (req, res, next) {
    var profile = req.session.profile;
    var content = '../pages/notifyList';
    return res.render('layouts/main', { profile, content });
});

router.get('/me', function (req, res, next) {
    var profile = req.session.profile;
    var content = '../pages/myNotify';
    return res.render('layouts/main', { profile, content });
});

router.get('/detail', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/');

    var idAnnounce = req.query.idAnnounce;
    if (!idAnnounce) return res.redirect('/notify/list');

    var profile = req.session.profile;
    var content = '../pages/notifyDetail';

    var listCategory = [
        {
            idCategory: 'CTHSSV',
            auths: 1,
            name: 'Phòng Công tác học sinh sinh viên',
        },
        { idCategory: 'PDH', auths: 2, name: 'Phòng Đại học' },
        {
            idCategory: 'PKT',
            auths: 3,
            name: 'Phòng khảo thí và kiểm định chất lượng',
        },
        { idCategory: 'PTC', auths: 4, name: 'Phòng tài chính' },
        { idCategory: 'CLC', auths: 5, name: 'TDT Creative Language Center' },
        { idCategory: 'TTTH', auths: 6, name: 'Trung tâm tin học' },
        {
            idCategory: 'SDTC',
            auths: 7,
            name: 'Trung tâm đào tạo phát triển xã hội',
        },
        {
            idCategory: 'ATEM',
            auths: 8,
            name: 'Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ',
        },
        {
            idCategory: 'CSV',
            auths: 9,
            name: 'Trung tâm hợp tác doanh nghiệp và cựu sinh viên',
        },
        { idCategory: 'KL', auths: 10, name: 'Khoa Luật' },
        {
            idCategory: 'TTNNTHVH',
            auths: 11,
            name: 'Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa',
        },
        {
            idCategory: 'VCSKT',
            auths: 12,
            name: 'Viện chính sách kinh tế và kinh doanh',
        },
        { idCategory: 'KDDT', auths: 13, name: 'Khoa Điện – Điện tử' },
        { idCategory: 'KCNTT', auths: 14, name: 'Khoa Công nghệ thông tin' },
        { idCategory: 'LQTKD', auths: 15, name: 'Khoa Quản trị kinh doanh' },
        {
            idCategory: 'KMT',
            auths: 16,
            name: 'Khoa Môi trường và bảo hộ lao động',
        },
        { idCategory: 'KLDCD', auths: 17, name: 'Khoa Lao động công đoàn' },
        { idCategory: 'KTCNH', auths: 18, name: 'Khoa Tài chính ngân hàng' },
        { idCategory: 'KGDQT', auths: 19, name: 'Khoa giáo dục quốc tế' },
        { idCategory: 'KMTCN', auths: 20, name: 'Khoa Mỹ thuật công nghiệp' },
        { idCategory: 'PSDH', auths: 21, name: 'Phòng Sau đại học' },
        { idCategory: 'PDTMT', auths: 22, name: 'Phòng điện toán và máy tính' },
    ];

    notify
        .find({ idNotify: idAnnounce })
        .exec()
        .then((data) => {
            if (!data.length) return res.redirect('/notify/list');
            return res.render('layouts/main', {
                profile,
                content,
                data,
                listCategory,
            });
        })
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    if (profile.position !== 0 && profile.position !== 2)
        return res.json({ code: 2, message: 'unauthorized' });
    var { content, auths, tittle } = req.body;
    var idNotify = 'A' + Date.now();
    notify
        .find({ idNotify: idNotify })
        .exec()
        .then((data) => {
            if (data.length)
                return res.json({
                    code: 3,
                    message: 'id post exist, please try again',
                });
            process.env.TZ = 'Asia/Ho_Chi_Minh';
            var now = new Date();
            var dateTime = dateFormat(now);

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
            return res.json({ code: 0, data: newAnnounce });
        })
        .catch((err) => console.log(err));
    /*return res.redirect('/');*/
});

router.delete('/delete', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var profile = req.session.profile;
    if (profile.position !== 0 && profile.position !== 2)
        return res.json({ code: 2, message: 'unauthorized' });

    var { idNotify } = req.body;

    if (idNotify) {
        notify
            .find({
                $and: [{ idNotify: idNotify }, { idUser: profile.idUser }],
            })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });

                notify.deleteOne({ idNotify: idNotify }).exec();
                return res.json({
                    code: 0,
                    message: 'delete announce succeed',
                });
            })
            .catch((e) => console.log(e));
    }
});

router.delete('/deleteByAd', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var profile = req.session.profile;
    if (profile.position === 1)
        return res.json({ code: 2, message: 'unauthorized' });

    var { idNotify } = req.body;

    if (idNotify) {
        notify
            .find({ idNotify: idNotify })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({ code: 3, message: 'post not exist' });

                notify.deleteOne({ idNotify: idNotify }).exec();
                return res.json({
                    code: 0,
                    message: 'delete announce succeed',
                });
            })
            .catch((e) => console.log(e));
    }
});

router.post('/edit', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var profile = req.session.profile;
    if (profile.position !== 0 && profile.position !== 2)
        return res.json({ code: 2, message: 'unauthorized' });

    var { idNotify, content, tittle } = req.body;

    if (content && idNotify && tittle) {
        notify
            .find({
                $and: [{ idNotify: idNotify }, { idUser: profile.idUser }],
            })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });

                notify
                    .updateOne(
                        { idNotify: idNotify },
                        { $set: { tittle: tittle, content: content } },
                    )
                    .exec();
                return res.json({ code: 0, message: 'update success' });
            })
            .catch((err) => console.log(err));
    }
});

module.exports = router;
