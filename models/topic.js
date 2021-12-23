const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topic = new Schema({
    idTopic: String,
    auths: Number,
    name: String,
});

module.exports = mongoose.model('topic', topic);
