const Location = require('../models/Location');

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