const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

//Sets up the MongoDB connection 
//Also activate debugging 
const init = () => {
  mongoose.set('debug', true);

  //Connect to MongoDB Database 
  //DB_ATLAS_URL is from en env folder 
  //Where we specified the url to the DB
  mongoose
    .connect(process.env.DB_ATLAS_URL, {
      //Not necessary
      //If i want to use the new url, true. 
      useNewUrlParser: true,
    })
    .catch((err) => {
      console.log(`Error:${err.stack}`);
      process.exit(1);
    });

    //If everything works well then send this message
  mongoose.connection.on('open', () => {
    console.log(`Connected to Database`);
  });
};

module.exports = init;
