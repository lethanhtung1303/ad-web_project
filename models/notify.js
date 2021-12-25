const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notify = new Schema({
    idNotify: String,
    idUser: String,
    name: String,
    picture: String,
    tittle: String,
    content: String,
    dateTime: String,
    auths: Number,
});

module.exports = mongoose.model('notify', notify);
