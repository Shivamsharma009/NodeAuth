const crypto = require('crypto');
const mongoose = require('mongoose');
const validator =  require('bcrypt');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please tell your first name'],
        minlength: 8,
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please Provide a Phone Number'],
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;