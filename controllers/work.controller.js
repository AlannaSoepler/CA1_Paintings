const express = require('express');
const mongoose = require('mongoose');
const Work = require('../models/work.model.js');
const Artist = require('../models/artist.model.js');
const Museum = require('../models/museum.model.js');

const readData = (req, res) => {
  Work.find({})
    .populate('artist')
    .populate('museum')
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

  Work.findById(id)
    .populate('artist')
    .populate('museum')
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Work with id${id}, not found` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Work with id${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  const title = req.body.title;
  const artistId = req.body.artist;
  const museumId = req.body.museum;

  // Check if the artistId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(artistId)) {
    console.log(`Invalid artistId: ${artistId}`);
    return res.status(400).json({ message: 'Invalid artistId' });
  }

  // Check if the museumId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(museumId)) {
    console.log(`Invalid museumId: ${museumId}`);
    return res.status(400).json({ message: 'Invalid museumId' });
  }

  Work.create({ artist: artistId, museum: museumId, title })
    .then((work) => {
      // Update the Artist with the new Work ID
      return Artist.findByIdAndUpdate(
        artistId,
        //Ads element to document
        { $push: { works: work._id } },
        { new: true }
      ).then((updatedArtist) => {
        // Update the Museum with the new Work ID
        return Museum.findByIdAndUpdate(
          museumId,
          { $push: { works: work._id } },
          { new: true }
        ).then((updatedMuseum) => {
          // Send the updated Museum as the response
          res.status(201).json(work);
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    });
};

const updateData = (req, res) => {
  let data = req.body;
  let id = req.params.id;

  // Check if the artistId is provided and is a valid ObjectId
  if (data.artist && !mongoose.Types.ObjectId.isValid(data.artist)) {
    return res.status(400).json({ message: 'Invalid artistId' });
  }

  // Check if the museumId is provided and is a valid ObjectId
  if (data.museum && !mongoose.Types.ObjectId.isValid(data.museum)) {
    return res.status(400).json({ message: 'Invalid museumId' });
  }

  Work.findByIdAndUpdate(id, data, {
    // After finding a Work by Id. This option will give us the new data.
    new: true,
  })
    .then((newData) => {
      res.status(201).json(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err);
      } else if (err.name === 'CastError') {
        res.status(404).json({ msg: `Work with id ${id}, not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;
  // Retrieve the artistId and museumId from the Work document
  const artistId = req.body.artist;
  const museumId = req.body.museum;

  // Find the Work document by ID
  Work.findById(id)
    .then((work) => {
      if (!work) {
        return res.status(404).json({ msg: `Work with id ${id} not found` });
      }

      // Update the Artist document to remove the Work ID
      return Artist.findByIdAndUpdate(
        artistId,
        { $pull: { works: id } },
        { new: true }
      ).then((updatedArtist) => {
        // Update the Museum document to remove the Work ID
        return Museum.findByIdAndUpdate(
          museumId,
          { $pull: { works: id } },
          { new: true }
        ).then((updatedMuseum) => {
          // Delete the Work document
          return Work.findByIdAndDelete(id).then(() => {
            res.status(200).json({
              msg: `Work with id ${id} deleted.`,
            });
          });
        });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ msg: `Work with id ${id} not found` });
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
