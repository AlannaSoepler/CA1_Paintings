const Artist = require('../models/artist.model');
//Creating fake data
//I was using Faker however i kept getting error messages when using it.
const fakeArtist = () => {
  return {
    //Setting values for the fields
    full_name: 'John Doe',
    first_name: 'John',
    last_name: 'Doe',
    nationality: 'USA',
    style: 'Abstract',
    birth: new Date('1980-01-01'),
    death: new Date('2022-12-31'),
  };
};

// runs though generateFakeArtists x times when called.
const generateFakeArtists = (num) => {
  //Store new artist
  const artists = [];
  for (let i = 0; i < num; i++) {
    artists.push(fakeArtist());
  }
  //returns all newly created artists
  return artists;
};

const seedArtists = async () => {
  try {
    //get new artist x times
    const fakeArtists = generateFakeArtists(1);
    //Insert new artists into MongoDB
    const createdArtists = await Artist.create(fakeArtists);
    console.log('Artists seeded successfully:', createdArtists);
  } catch (error) {
    console.error('Error seeding artists:', error);
  }
};

module.exports = seedArtists;
