const express = require('express')
const markerModel = require('../models/Marker')
const app = express();

app.get('/markers', async (req, res) => {
    const markers =  await markerModel.find({});

    try {
        res.send(markers);
    } catch(err) {
        res.status(500).send(err);
    }
    });
    
    app.post('/markers', async (req, res) => {
        const marker = new markerModel(req.body);
      
        try {
          await marker.save();
          res.send(marker);
        } catch (err) {
          res.status(500).send(err);
        }
      });

module.exports = app