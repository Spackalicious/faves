const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    ytLink: { type: String, required: true },
    comments: [{ type: String }]
});

module.exports = mongoose.model('Song', songSchema);