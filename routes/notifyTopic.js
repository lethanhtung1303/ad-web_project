var express = require('express');
var router = express.Router();
const topic = require('../models/topic')
/* GET users listing. */
router.get('/', function (req, res, next) {
    if(!req.session.profile)
        return res.redirect("/")

    var profile = req.session.profile
    var content = '../pages/notifyTopic'

    topic.find({}).exec()
    .then(data => {   
        data.reverse()      
        return res.render("layouts/main", {profile, content, data})
    })
    .catch(err => console.log(err))
});

module.exports = router;
