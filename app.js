//Global App Controller
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');


//route handlers
const userRouter = require('./routes/userRoutes');


//start express app
const app = express();

app.use(cors());

//body-parser , reading data from body into req.body
app.use(bodyParser.json());

app.use((req,res, next) => {
    req.requestTime = new Date().toString();
    next();

})





//Routes
//app.use('/signUp', userRouter);

app.get('/', (req,res) => {
    res.send('<h1>Hello from the Server</h1>');
})


app.use('/api/v1/users', userRouter);


module.exports = app;