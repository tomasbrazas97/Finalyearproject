const express = require('express')
const markers = express.Router()
const cors = require('cors')
const Marker = require('../models/Markers')
markers.use(cors())


module.exports = markers;