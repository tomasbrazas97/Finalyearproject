const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  httpAdapter: 'https',
  apiKey: 'AIzaSyCQ9ahuGv8XqvSws7q6pQxMD7xnVhokzu8', 
  formatter: null 
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;