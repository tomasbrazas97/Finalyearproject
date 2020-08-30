const Location = require('../models/Location');

// get all locations
exports.getLocations = async (req, res, next) => {
   try {
    const locations = await Location.find();

    return res.status(200).json({
        success: true,
        count: locations.length,
        data: locations
    })
   } catch(err){
        console.error(err);
        res.status(500).json({ error: ' Server error'});
   }
} 

// create a location
exports.addLocation = async (req, res, next) => {
    try {
      const location = await Location.create(req.body);

      return res.status(200).json({
          success: true,
          data: location
      })
    } catch(err){
         console.error(err);
         if(err.code == 11000) { // unique name error
             return res.status(400).json({ error: 'This location already exists'}); //user error
         }
         res.status(500).json({ error: ' Server error'});
    }
 } 