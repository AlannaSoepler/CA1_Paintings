const Museum = require('../models/museum.model');

const fakeMuseum = () => {
  return {
    name: 'Art Museum',
    address: '123 Main St',
    city: 'Cityville',
    state: 'State',
    postal_code: '12345',
    country: 'Country',
    phone: '123-456-7890',
    url: 'http://www.artmuseum.com',
  };
};

const generateFakeMuseums = (num) => {
  const museums = [];
  for (let i = 0; i < num; i++) {
    museums.push(fakeMuseum());
  }
  return museums;
};

const seedMuseums = async () => {
  try {
    const fakeMuseums = generateFakeMuseums(1); // Change the number as needed
    const createdMuseums = await Museum.create(fakeMuseums);
    console.log('Museums seeded successfully:', createdMuseums);
  } catch (error) {
    console.error('Error seeding museums:', error);
  }
};

module.exports = seedMuseums;
