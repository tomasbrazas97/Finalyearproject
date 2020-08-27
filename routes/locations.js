const express = require('express');
const { getLocations } = require('../controllers/locations');
const router = express.Router();

router.route('/').get(getLocations);

module.exports = router;