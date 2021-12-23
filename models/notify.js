const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announces = new Schema({
    idAnnounce: String,
    idUser: String,
    name: String,
    picture: String,
    tittle: String,
    content: String,
    dateTime: String,
    auths: Number,
});

module.exports = mongoose.model('announce', announces);
