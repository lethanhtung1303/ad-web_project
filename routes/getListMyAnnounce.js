

var express = require('express');
var router = express.Router();
const notify = require('../models/notify')

router.get('/', function (req, res, next) {
    if(!req.session.profile)
        return res.json({'code': 2, 'message': 'please login'})
    var profile = req.session.profile
    notify.find({idUser : profile.idUser}).exec()
    .then(data => {       
        return res.json({'code': 0, 'data': data})
    })
})

module.exports = router;