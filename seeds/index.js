const mongoose = require('mongoose');
const {stringify} = require('uuid');
const cities = require('./cities');
const {descriptors,places}= require('./seedhelpers');
const Campground = require('../model/Templete');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp',{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<20;i++){
        const random = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20+1000 );
        const camp = new Campground({
            location:`${cities[random].city},${cities[random].state}`,
            title:`${sample(descriptors)},${sample(places)}`,
            image:'https://unsplash.com/s/collections/in-the-woods',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, nihil. Blanditiis ratione voluptate, illum quidem ipsum quia explicabo obcaecati! Maiores vitae numquam itaque voluptatibus alias aspernatur hic at. A, voluptates!',
            price:price
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})