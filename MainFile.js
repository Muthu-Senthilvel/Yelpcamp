const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {stringify} = require('uuid');
const Campground = require('./model/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp',{useNewUrlParser:true,useUnifiedTopology:true})
 .then(() =>{
    console.log('Mongo connection open!!!')
})
 .catch(err =>{
    console.log('Oh No Mongo connection error')
    console.log(err)
});

app.set('views engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/yelpcamp',(req,res)=>{
    res.render('mainview.ejs')
})

app.listen(3000,()=>{
    console.log('Port is serving on 3000!!!!')
})