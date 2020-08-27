const express = require('express');
const { getLocations, addLocation } = require('../controllers/locations');
const router = express.Router();

router.route('/').get(getLocations).post(addLocation);

module.exports = router;