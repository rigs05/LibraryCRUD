const { Schema, model } = require('mongoose');

const LibrarySchema = new Schema({
    bookId: {
        type: String,
        requrired: true,
        unique: true
    },

    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true
    },

    summary: {
        type: String
    }
});

const LibModel = model('user', LibrarySchema);

module.exports = LibModel;