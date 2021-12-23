var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = router;
router.get('/', function (req, res, next) {
     if(!req.session.profile)
        return res.redirect('/login')
    
    var profile = req.session.profile
    
    if(profile.position !== 0)
        return res.redirect('/login')
    
       var content = '../pages/addDept';

    users.find({"position" : 2}).exec()``
    .then(data => {
        return res.render("layouts/main", {profile, content, data})
    })
    .catch(e => console.log(e))
    
});
