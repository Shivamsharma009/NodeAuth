const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({path: './config.env'});
const app = require('./app');


mongoose
  .connect(`mongodb+srv://Shivam:${process.env.DATABASE_PASSWORD}@cluster0.mds90.mongodb.net/myFirstDatabase?retryWrites=true&w=majorit`,
  {
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useCreateIndex: true,
      useFindAndModify: false
      
  }
  )

  .then(() => console.log('DB Connection Sucessfull'))
  .catch(() => console.log('Not Connected'));


  const port = process.env.port || 4000;
  
  const server= app.listen(port , () => {
      console.log(`App Running on port ${port}....`);
  });


