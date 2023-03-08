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
        const price = Math.floor(Math.random()*2000 );
        const images = [
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036639/YelpCamp/guervje6uz8kgzqxfpwd.jpg',
                filename: 'YelpCamp/guervje6uz8kgzqxfpwd'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036640/YelpCamp/ngcsayf7bhowbgdpbbsg.jpg',
                filename: 'YelpCamp/ngcsayf7bhowbgdpbbsg'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036641/YelpCamp/jgdc2hgbmgdy3ouvxsqz.jpg',
                filename: 'YelpCamp/jgdc2hgbmgdy3ouvxsqz'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036641/YelpCamp/c3mjgxycy29z4j7ozppa.jpg',
                filename: 'YelpCamp/c3mjgxycy29z4j7ozppa'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036644/YelpCamp/wir9ulsqup9gzsp7s4dy.jpg',
                filename: 'YelpCamp/wir9ulsqup9gzsp7s4dy'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624498507/YelpCamp/p3lc8tnstzk3ylinfyza.jpg',
                filename: 'YelpCamp/p3lc8tnstzk3ylinfyza'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629670771/YelpCamp/tdjzgcii1zewvlendzh9.jpg',
                filename: 'YelpCamp/tdjzgcii1zewvlendzh9'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629670772/YelpCamp/kuyd9cm960eglbbvblgj.jpg',
                filename: 'YelpCamp/kuyd9cm960eglbbvblgj'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629671351/YelpCamp/b4mig9at9thhqow6yh2u.jpg',
                filename: 'YelpCamp/b4mig9at9thhqow6yh2u'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629688572/YelpCamp/kpcmbnobh13asqgugxer.jpg',
                filename: 'YelpCamp/kpcmbnobh13asqgugxer'
            },
        ];
        const randomImageIndex = Math.floor(Math.random() * 9);
        const camp = new Campground({
            location:`${cities[random].city},${cities[random].state}`,
            title:`${sample(descriptors)},${sample(places)}`,
            picture:images[randomImageIndex].url,
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, nihil. Blanditiis ratione voluptate, illum quidem ipsum quia explicabo obcaecati! Maiores vitae numquam itaque voluptatibus alias aspernatur hic at. A, voluptates!',
            price:price
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})