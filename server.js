//Connect to Server and Database

//Global App Controller
const path = require('path');
const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app');


mongoose
.connect(`mongodb+srv://Shivam:${process.env.DATABASE_PASSWORD}@cluster0.rkdin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}
)
.then(() => console.log('DB Connection Sucessfully!'))
.catch(() => console.log('Not Connected'));


const port = process.env.port || 3000;

const server = app.listen(port , () => {
    console.log(`App running on port ${port}`);
});


