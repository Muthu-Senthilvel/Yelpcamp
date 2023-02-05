const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    Title: String,
    Price: String,
    Description: String,
    Location: String
});
module.exports = mongoose.model('Campground',CampgroundSchema);