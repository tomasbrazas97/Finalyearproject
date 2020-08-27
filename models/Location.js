const mongoose = require('mongoose')
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

module.exports = Location = mongoose.model('locations', LocationSchema);