const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const posts = new Schema({
    idPost: String,
    idUser: String,
    name: String,
    picture: String,
    content: String,
    link: String,
    comment: Array,
    dateTime: String,
});

module.exports = mongoose.model('post', posts);
