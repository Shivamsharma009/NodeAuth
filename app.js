const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

//route require
const userRouter = require('./routes/userRoutes');


//start express app
const app = express();


app.use(cors());


app.use(bodyParser.json());


//test
app.get('/',(req,res) => {
    res.send('<h1>Hello from the server!');
})

//Routes


app.get('/', (req, res) => {
    res.send('<h1>Hello from the Server </h1>');
})


app.use('/api/v1/users', userRouter);



module.exports = app;