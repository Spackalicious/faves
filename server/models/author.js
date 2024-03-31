const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Author', authorSchema);