const express = require('express');
const Museum = require('../models/museum.model.js');

const readData = (req, res) => {
    Museum.find({})
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

  Museum.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Museum with id${id}, not found` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Museum with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);
  let inputData = req.body;

  Museum.create(inputData)
    .then((data) => {
      console.log(`New Museum created`, data);
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
  Museum.findByIdAndUpdate(id, data, {
    //After find a Museum by Id. This option will give us the new data.
    new: true,
  })
    .then((newData) => {
      res.status(201).json(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err);
      } else if (err.name === 'CastError') {
        res.status(404).json({ msg: `Museum with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;
  Museum.findByIdAndDelete(id)
    .then((newData) => {
      if (!newData) {
        res.status(404).json({ msg: `Museum with id${id}, not found` });
      } else {
        res.status(200).json({
          msg: `Museum with id${id} deleted.`,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Museum with id${id}, not found` });
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
