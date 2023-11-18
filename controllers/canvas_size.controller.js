const express = require('express');
const Canvas_size = require('../models/canvas_size.model.js');

const readData = (req, res) => {
    Canvas_size.find({})
    .populate('canvas_sizes')
    //.lean().select()
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

  Canvas_size.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Canvas_size with id${id}, not found` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Canvas_size with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);
  let inputData = req.body;

  Canvas_size.create(inputData)
    .then((data) => {
      console.log(`New Canvas_size created`, data);
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
  Canvas_size.findByIdAndUpdate(id, data, {
    //After find a Canvas_size by Id. This option will give us the new data.
    new: true,
  })
    .then((newData) => {
      res.status(201).json(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err);
      } else if (err.name === 'CastError') {
        res.status(404).json({ msg: `Canvas_size with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;
  Canvas_size.findByIdAndDelete(id)
    .then((newData) => {
      if (!newData) {
        res.status(404).json({ msg: `Canvas_size with id${id}, not found` });
      } else {
        res.status(200).json({
          msg: `Canvas_size with id${id} deleted.`,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Canvas_size with id${id}, not found` });
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
