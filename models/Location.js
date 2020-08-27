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

// Geocode and create location
LocationSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
});

module.exports = Location = mongoose.model('locations', LocationSchema);