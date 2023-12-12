const express = require('express');
const Artist = require('../models/artist.model.js');
const Museum = require('../models/museum.model.js');
const Work = require('../models/work.model.js');

const readData = (req, res) => {
  Artist.find({})
    .populate({
      path: 'works',
      populate: {
        path: 'museum',
      },
    })
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
    .populate({
      path: 'works',
      populate: {
        path: 'museum',
      },
    })
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

  // Works field should not be included during artist creation
  delete inputData.works;

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
  console.log('Update data function called');
  let data = req.body;
  let id = req.params.id;

  console.log('ID:', id);
  console.log('Data to be updated:', data);
  // Remove the 'works' field from the update data
  delete data.works;

  Artist.findByIdAndUpdate(id, data, { new: true })
    .then((newData) => {
      console.log('Data updated successfully');
      res.status(201).json(newData);
    })
    .catch((err) => {
      // Handle errors
      console.log('Error updating data:', err);
      res.status(500).json(err);
    });
};

const deleteData = (req, res) => {
  // Update database
  // Check if Artist exists
  // Delete Artist and related Works
  // Update related Museum
  let id = req.params.id;

  // Find the Artist document by ID
  Artist.findById(id)
    .then((artist) => {
      if (!artist) {
        return res.status(404).json({ msg: `Artist with id ${id} not found` });
      }

      // Find the related Works and delete them
      return Work.find({ artist: id }).then((works) => {
        // Extract museumIds from the related works
        const museumIds = works.map((work) => work.museum);

        // Delete the related Works
        return Work.deleteMany({ artist: id }).then(() => {
          // Delete the Artist document
          return Artist.findByIdAndDelete(id).then(() => {
            // Update related Museums by removing the reference to the deleted Works
            //This piece I got from CharGBT
            return Museum.updateMany(
              { _id: { $in: museumIds } },
              { $pull: { works: { $in: works.map((work) => work._id) } } }
            ).then(() => {
              res.status(200).json({
                msg: `Artist with id ${id}, related Works, and related Museums updated/deleted.`,
              });
            });
          });
        });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Artist with id ${id} not found` });
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
