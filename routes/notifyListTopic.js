var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if(!req.session.profile)
        return res.redirect("/")

    if(!req.query.auths)
        return res.redirect("/notifyTopic")
    var profile = req.session.profile
    var content = '../pages/notifyListTopic'

    
    return res.render("layouts/main", {profile, content})
});

module.exports = router;
