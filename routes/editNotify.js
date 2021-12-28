var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const users = require('../models/users');
const notify = require('../models/notify');

router.post('/editNotify', (req, res) => {
    if (!req.session.profile)
        return res.json({ code: 2, message: 'please login' });

    var profile = req.session.profile;
    if (profile.position !== 0 && profile.position !== 2)
        return res.json({ code: 2, message: 'unauthorized' });

    var { idNotify, content, tittle } = req.body;

    if (content && idNotify && tittle) {
        notify
            .find({
                $and: [{ idNotify: idNotify }, { idUser: profile.idUser }],
            })
            .exec()
            .then((data) => {
                if (!data.length)
                    return res.json({
                        code: 3,
                        message: 'post not exist or unauthorized',
                    });

                notify
                    .updateOne(
                        { idNotify: idNotify },
                        { $set: { tittle: tittle, content: content } },
                    )
                    .exec();
                return res.json({ code: 0, message: 'update success' });
            })
            .catch((err) => console.log(err));
    }
});

module.exports = router;
