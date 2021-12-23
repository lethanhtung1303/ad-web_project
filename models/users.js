const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
    idUser: String,
    password: String,
    name: String,
    email: String,
    position: Number,
    picture: String,
    gender: Number,
    classroom: String,
    faculty: String,
    auths: Array,
});

module.exports = mongoose.model('user', users);
