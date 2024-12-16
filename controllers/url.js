const express = require("express");
import { nanoid } from 'nanoid'
const URLSchema = require("../models/url");


async function generateShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : "Url Is Required"});
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        clickHistory : [],
    });

    return res.json({id : shortId});
}

module.exports = {
    generateShortURL
}