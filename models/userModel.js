const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true , 'Please tell your first name!']
    },
    lastName:{
        type: String,
        required: [true, 'Please tell your last name!']
    },
    email:{
        type: String,
        required: [true, 'Please Provide your email'],
        unique: true,
        validate: {
            validator: function(el){
                if(!el.unique){
                    message: 'User Already Exists'
                }

            }
        },
        lowercase: true,
        validate:[validator.isEmail, 'Please Provide a valid email']
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your password'],
        validate: {
            //this only works on CREATE AND SAVE!!!
            validator: function(el){
                return el !== el.password;
            },
            message: 'Password are not the Same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
        type: Boolean,
        default: true,
        select: false
    }
});


userSchema.pre('save' , async function(next){
    //only run this function if password was actually not modified
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete password confirm field
    this.passwordConfirm = undefined;

    next();
});


//this function is checking password and user password is correct or not
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;