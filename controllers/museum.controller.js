const express = require('express');
const fs = require('fs');
const Museum = require('../models/museum.model.js');
const Artist = require('../models/artist.model.js');
const Work = require('../models/work.model.js');

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

  // Works field should not be included during museum creation
  delete inputData.works;

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

  // Remove the 'works' field from the update data
  delete data.works;
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
  // Update database
  // Check if Artist exists
  // Delete Artist and related Works
  // Update related Museum
  let id = req.params.id;

  // Find the Artist document by ID
  Museum.findById(id)
    .then((museum) => {
      if (!museum) {
        return res.status(404).json({ msg: `Museum with id ${id} not found` });
      }

      // Find the related Works and delete them
      return Work.find({ museum: id }).then((works) => {
        // Extract museumIds from the related works
        const artistIds = works.map((work) => work.artist);

        // Delete the related Works
        return Work.deleteMany({ museum: id }).then(() => {
          // Delete the Artist document
          return Museum.findByIdAndDelete(id).then(() => {
            // Update related Museums by removing the reference to the deleted Works
            return Artist.updateMany(
              { _id: { $in: artistIds } },
              { $pull: { works: { $in: works.map((work) => work._id) } } }
            ).then(() => {
              res.status(200).json({
                msg: `Museum with id ${id}, related Works, and related Artists updated/deleted.`,
              });
            });
          });
        });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Museum with id ${id} not found` });
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
