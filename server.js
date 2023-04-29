const express = require('express')
const app =express()
const url = require('./models/url')
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://faizaafrin:Todaywin10@cluster0.yshpzyi.mongodb.net/testurl-shortner-task',{
    useNewUrlParser:true,useUnifiedTopology:true   
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const urls = await url.find()
    res.render('index',{urls:urls})
  
})

app.post('/urls',async (req,res)=>{
    await url.create({full:req.body.fullUrl})
    res.redirect('/')
})

app.get('/:urls',async(req,res)=>{
    const url = await url.findOne({short:req.params.url})
    if(url== null) return res.sendStatus(404)

    url.clicks ++
    url.save()

    res.redirect(url.full)
})

app.listen(process.env.PORT || 5000)