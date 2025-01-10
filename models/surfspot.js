const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurfSpotSchema = new Schema({
    location: String,
    size: String,
    description: String, 
    tide: String,
});

module.exports = mongoose.model('SurfSpot', SurfSpotSchema);