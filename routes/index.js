var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.profile) return res.redirect('/login');
    var profile = req.session.profile;
    var content = '../pages/index';
    return res.render('layouts/main', { profile, content });
});



// router.post('/addAnnouce', (req, res) => {
//     console.log("sadasd")
//     return res.redirect('/?post=success');
//     if(!req.session.profile)
//         return res.json({'code': 2, 'message': 'please login'})

//     var profile = req.session.profile
//     if(profile.position !== 0 && profile.position !== 2)
//         return res.json({'code': 2, 'message': 'unauthorized'})

//     var {content, auths, tittle} = req.body

//     if(content && auths && tittle){
//         var idAnnounce = "A" + String(Math.floor(Math.random() * (999999 - 100000)) + 100000)
//         notify.find({'idAnnounce': idAnnounce}).exec()
//         .then(data => {
//             if(data.length)
//                 return res.json({'code': 3, 'message': 'id post exist, please try again'})
            
//             var date = new Date();
//             var dateTime = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
            
//             var newAnnounce = new notify({
//                 idAnnounce : idAnnounce,
//                 idUser : profile.idUser,
//                 name : profile.name,
//                 picture : profile.picture,
//                 tittle : tittle,
//                 content : content,
//                 dateTime : dateTime,
//                 auths : parseInt(auths)
//             })
//             newAnnounce.save()
//             return res.json({'code': 0, 'data': newAnnounce})
//         })
//         .catch(err => console.log(err))
//     }
// })

module.exports = router;
