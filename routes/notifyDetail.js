var express = require('express');
var router = express.Router();
const notify = require('../models/notify')
/* GET users listing. */
router.get('/', function (req, res, next) {
    if(!req.session.profile)
    return res.redirect("/")

    var idAnnounce = req.query.idAnnounce
    if(!idAnnounce)
        return res.redirect("/")
        
    var profile = req.session.profile
    var content = '../pages/notifyDetail'

    var listCategory = [
        {idCategory: "CTHSSV", auths: 1, name: "Phòng Công tác học sinh sinh viên"},
        {idCategory: "PDH", auths: 2, name: "Phòng Đại học"},
        {idCategory: "PKT", auths: 3, name: "Phòng khảo thí và kiểm định chất lượng"},
        {idCategory: "PTC", auths: 4, name: "Phòng tài chính"},
        {idCategory: "CLC", auths: 5, name: "TDT Creative Language Center"},
        {idCategory: "TTTH", auths: 6, name: "Trung tâm tin học"},
        {idCategory: "SDTC", auths: 7, name: "Trung tâm đào tạo phát triển xã hội"},
        {idCategory: "ATEM", auths: 8, name: "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ"},
        {idCategory: "CSV", auths: 9, name: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên"},
        {idCategory: "KL", auths: 10, name: "Khoa Luật"},
        {idCategory: "TTNNTHVH", auths: 11, name: "Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa"},
        {idCategory: "VCSKT", auths: 12, name: "Viện chính sách kinh tế và kinh doanh"},
        {idCategory: "KDDT", auths: 13, name: "Khoa Điện – Điện tử"},
        {idCategory: "KCNTT", auths: 14, name: "Khoa Công nghệ thông tin"},
        {idCategory: "LQTKD", auths: 15, name: "Khoa Quản trị kinh doanh"},
        {idCategory: "KMT", auths: 16, name: "Khoa Môi trường và bảo hộ lao động"},
        {idCategory: "KLDCD", auths: 17, name: "Khoa Lao động công đoàn"},
        {idCategory: "KTCNH", auths: 18, name: "Khoa Tài chính ngân hàng"},
        {idCategory: "KGDQT", auths: 19, name: "Khoa giáo dục quốc tế"},
        {idCategory: "KMTCN", auths: 20, name: "Khoa Mỹ thuật công nghiệp"},
        {idCategory: "PSDH", auths: 21, name: "Phòng Sau đại học"},
        {idCategory: "PDTMT", auths: 22, name: "Phòng điện toán và máy tính"}
    ]

    notify.find({"idNotify" : idAnnounce}).exec()
    .then(data => {     
        if(!data.length)
            return res.redirect("/notifyDetail")
        return res.render("layouts/main", {profile, content, data, listCategory})
    })
    .catch(err => console.log(err))
});

module.exports = router;
