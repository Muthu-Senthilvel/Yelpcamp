const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    Title: String,
    Image: String,
    Price: Number,
    Description: String,
    Location: String
});
module.exports = mongoose.model('Campground',CampgroundSchema);