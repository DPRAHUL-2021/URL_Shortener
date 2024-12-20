const express = require("express");
// shortid is an npm package which is used to generate short-urls
const shortid =  require("shortid");
const URL = require("../models/url");

async function generateShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : "Url Is Required"});
    }
    const shortId = shortid.generate();
    await URL.create({
        shortID:shortId,
        redirectURL:body.url,
        clickHistory : [],
        createdBy : req.user._id,
    });

    return res.render("home",{
        id:shortId,
    });
    // return res.json({id : shortId});
}


async function getAnalytics(req,res){
    const shortId = req.params.shortID;
    const result = await URL.findOne({shortID:shortId});
    res.json({
        totalClicks : result.clickHistory.length,
        analytics:result.clickHistory,
    });
}


module.exports = {
    generateShortURL,
    getAnalytics,
}