const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
   id: { type: String, required: true },
   title: { type: String, required: true },
   author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author'}],
   genre: { type: String },
   imgURL: { type: String, required: true },
   myReview: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);