const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async(req,res,next) => {
    const users = await User.find();

    //Send Response
    res.status(200).json({
        status: 'sucess',
        results: users.length,
        data: {
            users
        }
    });
});