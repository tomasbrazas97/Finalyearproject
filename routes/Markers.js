const express = require('express')
const mongoose = require('mongoose')
const Marker = require('../models/Markers')
const route = express.Router();

route.post('/', (req, res) => {
    const{LONG,LAT} = req.body;
    let marker = {};
    marker.LONG = LONG;
    marker.LAT = LAT;
    let markerModel = new Marker(marker);
    markerModel.save();
    res.json(markerModel);
});

module.exports = route;