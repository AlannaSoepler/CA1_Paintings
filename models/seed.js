// seed.js
const mongoose = require('mongoose');
const seedArtists = require('./artist.seeder');
const seedMuseums = require('./museum.seeder');

// Seed all models
const seedDatabase = async () => {
  await seedArtists();
  await seedMuseums();

  // Disconnect from the database
  mongoose.disconnect();
};

// Execute the seed function
seedDatabase();
