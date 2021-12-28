var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');
const notify = require('../models/notify');

router.get('/getAnnounce', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    notify
        .find({})
        .exec()
        .then((data) => {
            return res.json({ code: 0, data: data });
        });
});
module.exports = router;
