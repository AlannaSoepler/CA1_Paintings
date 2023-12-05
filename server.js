//Import libraries
const express = require('express');
const app = express();
const cors = require('cors');
//Sets up port for server to listen to
const port = 3000;
//To handle JSON web Tokens
const jwt = require('jsonwebtoken');
//Import the user model for authentication
const user = require('./models/user.model.js');
//Load env variables
require('dotenv').config();
//initialize the database connection
require('./configs/db.js')();
app.use(cors());

//Sets up the middleware
app.use(express.json());
//Not very necessary for the API part of the build
app.set('view engine', 'html');

app.use(express.static(__dirname + '/views/'));

//custom middleware
app.use((req, res, next) => {
  //Logging headers
  console.log(req.headers);
  let token = null;
  // Extracting token from Authorization header
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ');
  }

  console.log(token);
  //Verifying and decoding the token
  // If token is valid
  //If token contains Bearer. then decode token

  if (token && token[0] === 'Bearer') {
    jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        req.user = undefined;
      }
      //If all is clear continue
      req.user = decoded;
      next();
    });
  }
  //If there is no token
  else {
    console.log('No token');
    req.user = undefined;
    next();
  }
});

//Define routes for all the API endpoints
app.use('/api/users', require('./routes/users'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/museums', require('./routes/museums'));
app.use('/api/works', require('./routes/works'));

//Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//module.exports = app;
