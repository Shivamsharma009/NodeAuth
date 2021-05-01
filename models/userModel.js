
const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true , 'Please tell your user name!']
    },
    phoneNumber: {
        type: Number,
        required: true
    }
   
});





const User = mongoose.model('User', userSchema);

module.exports = User;