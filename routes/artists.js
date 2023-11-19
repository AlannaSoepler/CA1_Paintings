const express = require('express');
const router = express.Router();
//Import middleware from the user controller
const { loginRequired } = require('../controllers/user.controller.js');
//Import these methods from the artist controller
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require('../controllers/artist.controller.js');

//Defining the routes
router
  //Get all my artists
  .get('/', readData)
  //Get 1 artist with id XYZ
  .get('/:id', readOne)
  //These have a login requirement.
  //Is uses the user middleware
  //Create a new artist
  .post('/', loginRequired, createData)
  //Update artist with id XYZ
  .put('/:id', loginRequired, updateData)
  //Delete artist with id XYZ
  .delete('/:id', loginRequired, deleteData);

//Export routes so it can be used else ware
module.exports = router;
