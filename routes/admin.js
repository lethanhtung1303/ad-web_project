var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');
const topic = require('../models/topic');

// GET start system.
router.get('/', (req, res) => {
    users
        .find({ idUser: 'admin' })
        .exec()
        .then((data) => {
            if (data.length) return res.redirect('/login?err=Đã tạo admin');

            var arr = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22,
            ];
            var admin_users = new users({
                auths: arr,
                idUser: 'admin',
                password: bcrypt.hashSync('1234', 10),
                name: 'admin',
                email: 'admin@gmail.com',
                position: 0,
                picture: '/images/logo.jpg',
            });

            admin_users.save();

            var list = [
                {
                    idTopic: 'CTHSSV',
                    auths: 1,
                    name: 'Phòng Công tác học sinh sinh viên',
                },
                { idTopic: 'PDH', auths: 2, name: 'Phòng Đại học' },
                {
                    idTopic: 'PKT',
                    auths: 3,
                    name: 'Phòng khảo thí và kiểm định chất lượng',
                },
                { idTopic: 'PTC', auths: 4, name: 'Phòng tài chính' },
                {
                    idTopic: 'CLC',
                    auths: 5,
                    name: 'TDT Creative Language Center',
                },
                { idTopic: 'TTTH', auths: 6, name: 'Trung tâm tin học' },
                {
                    idTopic: 'SDTC',
                    auths: 7,
                    name: 'Trung tâm đào tạo phát triển xã hội',
                },
                {
                    idTopic: 'ATEM',
                    auths: 8,
                    name: 'Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ',
                },
                {
                    idTopic: 'CSV',
                    auths: 9,
                    name: 'Trung tâm hợp tác doanh nghiệp và cựu sinh viên',
                },
                { idTopic: 'KL', auths: 10, name: 'Khoa Luật' },
                {
                    idTopic: 'TTNNTHVH',
                    auths: 11,
                    name: 'Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa',
                },
                {
                    idTopic: 'VCSKT',
                    auths: 12,
                    name: 'Viện chính sách kinh tế và kinh doanh',
                },
                { idTopic: 'KDDT', auths: 13, name: 'Khoa Điện – Điện tử' },
                {
                    idTopic: 'KCNTT',
                    auths: 14,
                    name: 'Khoa Công nghệ thông tin',
                },
                {
                    idTopic: 'LQTKD',
                    auths: 15,
                    name: 'Khoa Quản trị kinh doanh',
                },
                {
                    idTopic: 'KMT',
                    auths: 16,
                    name: 'Khoa Môi trường và bảo hộ lao động',
                },
                {
                    idTopic: 'KLDCD',
                    auths: 17,
                    name: 'Khoa Lao động công đoàn',
                },
                {
                    idTopic: 'KTCNH',
                    auths: 18,
                    name: 'Khoa Tài chính ngân hàng',
                },
                {
                    idTopic: 'KGDQT',
                    auths: 19,
                    name: 'Khoa giáo dục quốc tế',
                },
                {
                    idTopic: 'KMTCN',
                    auths: 20,
                    name: 'Khoa Mỹ thuật công nghiệp',
                },
                { idTopic: 'PSDH', auths: 21, name: 'Phòng Sau đại học' },
                {
                    idTopic: 'PDTMT',
                    auths: 22,
                    name: 'Phòng điện toán và máy tính',
                },
            ];

            list.forEach((val) => {
                var data = new topic({
                    idTopic: val.idTopic,
                    auths: val.auths,
                    name: val.name,
                });

                data.save();
            });

            return res.redirect('/login');
        })
        .catch((err) => console.log(err));
});

module.exports = router;
