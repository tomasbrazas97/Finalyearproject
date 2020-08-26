const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MarkerSchema = new Schema({
  LAT: {
    type: String,
    required: true
  },
  LONG: {
    type: String,
    required: true
  }
})

module.exports = Marker = mongoose.model('markers', MarkerSchema)