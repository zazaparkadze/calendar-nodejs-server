const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    roles: {
        Admin: {
            type: Number,
        },
        Editor: Number,
        User: {
            type: Number,
            default: 2001,
        },
    },
    password: {
        type: String,
        required: true,
    },

    refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
