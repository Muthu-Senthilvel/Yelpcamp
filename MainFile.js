const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {stringify} = require('uuid');
const Campground = require('./model/Templete');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp',{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error:"));
db.once("open",()=>{
    console.log("Database connected");
});


app.set('views engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/yelpcamp',(req,res)=>{
    res.render('mainview.ejs')
})

app.get('/yelpcamp/templete',async(req,res)=>{
    const camp = await new Campground({title:'My background',description:'Cheap camping!!'});
    res.send(camp);
})

app.listen(3000,()=>{
    console.log('Port is serving on 3000!!!!')
})