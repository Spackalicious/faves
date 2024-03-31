const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxSongId: { type: Number, required: true },
    maxBookId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);