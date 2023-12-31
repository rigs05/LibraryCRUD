const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userId: {
        type: String,
        requrired: true,
        unique: true
    },

    pass: {
        type: String,
        required: true,
    }
});

const UserModel = model('users', UserSchema);

module.exports = UserModel;