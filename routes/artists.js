const express = require('express');
const router = express.Router();
const { loginRequire } = require('../controllers/user.controller.js');
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require('../controllers/artist.controller.js');

router
  .get('/', readData)
  .get('/:id', readOne)
  .post('/', createData)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;