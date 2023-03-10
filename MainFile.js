const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {stringify} = require('uuid');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require('./model/Templete');
const { findByIdAndUpdate } = require('./model/Templete');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp',{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error:"));
db.once("open",()=>{
    console.log("Database connected");
});

app.engine('ejs',ejsMate);
app.set('views engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(morgan('dev'))
const verifiedPasscord =(req,res,next)=>{
    const {passcord} = req.query;
    if (passcord==='Muthu'){
        next();
    }
    res.send('SORRY WRONG PASSCORD')
}

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/yelpcamp',async(req,res)=>{
    const allcampgrounds = await Campground.find({});
    res.render('home.ejs',{allcampgrounds})
})

app.get('/yelpcamp/new', verifiedPasscord,(req,res)=>{
    res.render('New.ejs')
})
app.post('/yelpcamp',async(req,res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/yelpcamp/${campground._id}`) 
})

app.get('/yelpcamp/:id',async(req,res)=>{
    const{id} =req.params;
    const singleCamp = await Campground.findById(id)
    res.render('show.ejs',{singleCamp});
})

app.get('/yelpcamp/:id/edit',async(req,res)=>{
    const{id} =req.params;
    const singleCamp = await Campground.findById(id)
    res.render('edit.ejs',{singleCamp});
})
app.put('/yelpcamp/:id',async(req,res)=>{
    const{id} = req.params;
    const singleCamp= await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/yelpcamp/${singleCamp._id}`) 
})

app.delete('/yelpcamp/:id',async(req,res)=>{
    const{id}=req.params;
    const deletecampground= await Campground.findByIdAndDelete(id);
    res.redirect('/yelpcamp');
})

app.use((req,res)=>{
    res.send('ENTER PROPER URL PATH!!!!')
})

app.listen(3000,()=>{
    console.log('Port is serving on 3000!!!!')
})