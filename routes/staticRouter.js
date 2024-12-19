const express = require("express");
const URL = require("../models/url");
const router = express.Router();

// Home Page
router.get('/', async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render('home',{
        urls:allUrls,
    });
})

// Table for the Click History
router.get('/clicks',async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render('clicks',{
        urls:allUrls,
    });
})

router.get('/signup', (req,res)=>{
    return res.render('signup');
})

router.get('/login', (req,res)=>{
    return res.render('login');
})


module.exports = router;
