require('dotenv').config();
var express = require('express');
var router = express.Router();

const { OAuth2Client, auth } = require('google-auth-library');

const bcrypt = require('bcrypt');

const users = require('../models/users');
const CLIENT_ID =
    '545776708334-l6u0t1gqtvgh12vt5704mh0p9o30im94.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

/* GET users listing. */
router.post('/', function (req, res, next) {
    var token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        if (payload.hd) {
            var email = payload.email;
            var idUser = email.split('@')[0];
            users
                .find({ idUser: idUser })
                .exec()
                .then((data) => {
                    if (data.length)
                        return res.json({
                            code: 1,
                            message: 'account created',
                        });

                    var newAccount = new users({
                        idUser: idUser,
                        password: bcrypt.hashSync('1234', 10),
                        name: payload.name,
                        email: email,
                        position: 1,
                        gender: 0,
                        classroom: '',
                        faculty: '',
                        picture: payload.picture,
                    });

                    newAccount.save();
                    return res.json({
                        code: 0,
                        message: 'create account succeed',
                    });
                })
                .catch((err) => console.log(err));
        } else {
            return res.json({ code: 2, message: 'email not permission' });
        }
    }
    verify().catch(console.error);
});

module.exports = router;
