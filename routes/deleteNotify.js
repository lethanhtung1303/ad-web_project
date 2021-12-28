
var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');
const notify = require('../models/notify');


router.delete('/deleteAnnounce',(req, res) => {
    if(!req.session.profile)
        return res.json({'code': 2, 'message': 'please login'})

    var profile = req.session.profile
    if(profile.position !== 0 && profile.position !== 2)
        return res.json({'code': 2, 'message': 'unauthorized'})

    var {idNotify} = req.body

    if(idNotify){
        notify.find({"$and":[{"idNotify":idNotify},{"idUser": profile.idUser}]}).exec()
        .then(data => {
            if(!data.length)
                return res.json({'code': 3, "message" : "post not exist or unauthorized"})
            
            notify.deleteOne({"idNotify" : idNotify}).exec()
            return res.json({'code' : 0, "message" : "delete announce succeed"})
        })
        .catch(e => console.log(e))
    }
})

router.delete('/deleteAnnounceAdm', (req, res) => {
     
   
    if(!req.session.profile)
        return res.json({'code': 2, 'message': 'please login'})

    var profile = req.session.profile
    if(profile.position !== 0)
        return res.json({'code': 2, 'message': 'unauthorized'})


    var {idNotify} = req.body

    if(idNotify){
        notify.find({"idNotify":idNotify}).exec()
        .then(data => {
            if(!data.length)
                return res.json({'code': 3, "message" : "post not exist"})
            
            notify.deleteOne({"idNotify" : idNotify}).exec()
            return res.json({'code' : 0, "message" : "delete announce succeed"})
        })
        .catch(e => console.log(e))
    }
})
module.exports = router;