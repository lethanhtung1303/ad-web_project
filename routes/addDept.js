/* GET users listing. */
var express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/images' });
const fs = require('fs');
const users = require('../models/users');
const bcrypt = require('bcrypt');
var router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    if (profile.position !== 0) return res.redirect('/login');

    var listAuths = [
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

    var mess = '';
    if (req.query.mess) mess = req.query.mess;
    var content = '../pages/addDept';
    return res.render('layouts/main', { profile, content, mess, listAuths });
});

router.post('/', upload.single('picture'), (req, res) => {
    if (!req.session.profile) return res.redirect('/login');

    var profile = req.session.profile;

    if (profile.position !== 0) return res.redirect('/login');

    var { idUser, name, email } = req.body;

    var {
        CTHSSV,
        PDH,
        PKT,
        PTC,
        CLC,
        TTTH,
        SDTC,
        ATEM,
        CSV,
        KL,
        TTNNTHVH,
        VCSKT,
        KDDT,
        KCNTT,
        LQTKD,
        KMT,
        KLDCD,
        KTCNH,
        KGDQT,
        KMTCN,
        PSDH,
        PDTMT,
    } = req.body;

    var arrayTemp = [
        CTHSSV,
        PDH,
        PKT,
        PTC,
        CLC,
        TTTH,
        SDTC,
        ATEM,
        CSV,
        KL,
        TTNNTHVH,
        VCSKT,
        KDDT,
        KCNTT,
        LQTKD,
        KMT,
        KLDCD,
        KTCNH,
        KGDQT,
        KMTCN,
        PSDH,
        PDTMT,
    ];
    var auths = [];
    arrayTemp.forEach((val) => {
        if (val) auths.push(parseInt(val));
    });

    var picture = req.file;
    fs.renameSync(picture.path, `./public/images/${picture.originalname}`);
    if (idUser && name && email && picture) {
        users
            .find({ idUser: idUser })
            .exec()
            .then((data) => {
                if (data.length) return res.redirect('/addDept?mess=Add Fail');

                var NewUsers = new users({
                    idUser: idUser,
                    password: bcrypt.hashSync('1234', 10),
                    name: name,
                    email: email,
                    position: 2,
                    picture: '/images/' + picture.originalname,
                    auths: auths,
                });

                NewUsers.save();

                return res.redirect('/deptList?mess=Add Success');
            })
            .catch((e) => console.log(e));
    } else {
        return res.redirect('/addDept?mess=Add Fail');
    }
});

module.exports = router;
