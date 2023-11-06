const express = require('express');
const Artist = require('../models/artist.model.js');

const readData = (req, res) => {
  Artist.find({})
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json(`Non Found`);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  Artist.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Artist with id${id}, not found` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Artist with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);
  let inputData = req.body;

  Artist.create(inputData)
    .then((data) => {
      console.log(`New Artist created`, data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const updateData = (req, res) => {
  let data = req.body;
  let id = req.params.id;
  Artist.findByIdAndUpdate(id, data, {
    //After find a Artist by Id. This option will give us the new data.
    new: true,
  })
    .then((newData) => {
      res.status(201).json(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err);
      } else if (err.name === 'CastError') {
        res.status(404).json({ msg: `Artist with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  //Update database
  //Check if Artist exists
  //delete Artist
  let id = req.params.id;
  Artist.findByIdAndDelete(id)
    .then((newData) => {
      if (!newData) {
        res.status(404).json({ msg: `Artist with id${id}, not found` });
      } else {
        res.status(200).json({
          msg: `Artist with id${id} deleted.`,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Artist with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

module.exports = {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
};
