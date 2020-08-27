const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
const Schema = mongoose.Schema

// Create Schema
const LocationSchema = new Schema({
  locationName: {
    type: String,
    required: [true, 'Please add a location Name'],
    unique: true,
    trim: true,
    maxlength: [30, 'Location name must be less than 30 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String, 
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
     formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Piece of Middleware
// Geocode and create location
LocationSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = Location = mongoose.model('locations', LocationSchema);