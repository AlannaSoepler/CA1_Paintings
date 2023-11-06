const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const user = require('./models/user.model.js');
require('dotenv').config();
require('./configs/db.js')();

app.use(express.json());
app.set('view engine', 'html');

app.use(express.static(__dirname + '/views/'));

//custom middleware
app.use((req, res, next) => {
  console.log(req.headers);
  let token = null;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ');
  }

  console.log(token);

  if (token && token[0] === 'Bearer') {
    // verify token is valid
    jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        req.user = undefined;
      }
      req.user = decoded;
      next();
    });
  } else {
    console.log('No token');
    req.user = undefined;
    next();
  }
});

//app.use((req, res, next) => {
//console.log(req, user);
//next();
//});

app.use('/api/users', require('./routes/users'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/museums', require('./routes/museums'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
