const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',

  httpAdapter: 'https',
  apiKey: 'WBgQ9mKCmz264ULUch7XDleI62TvS3Gq', 
  formatter: null 
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;