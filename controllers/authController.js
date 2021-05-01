const crypto = require('crypto');
const {promisfy} = require('util');

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const mailgun =  require('mailgun-js');
const DOMAIN = 'sandbox14d29f101c51488f97b42d2fecf66e83.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}




const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token , cookieOptions);



    //Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'signup sucess',
        token,
        data: {
            user
            }
        });   
}


exports.signup = catchAsync(async(req,res,next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    //email verfication part here
    //==============================
    
   


    createSendToken(newUser, 201, req,res);
});


exports.login = catchAsync(async(req,res,next) => {
    const{email, password} = req.body;

    //1) Check if email and password Exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    //2) Check if user exists && password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password , user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    //3) If everything ok send token to client
    createSendToken(user, 200, req, res);
});

exports.logout = (req,res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({status: 'success'});
}


/**
 * Email verificaton part remaining only
 */

            

                
           

        