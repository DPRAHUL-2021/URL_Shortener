const express = require("express");
const app = express();
const PORT = 8000;
const URL = require("./models/url")
const {connectMongoDB} = require("./connect");

const URLRoute = require("./routes/url");
connectMongoDB("mongodb://localhost:27017/short-url").then(()=>{
    console.log("Connection Established With MongoDB")
})

// Middleware so that the body is parsed in PostMan
app.use(express.json());

app.use("/url",URLRoute);


app.get("/:shortID", async(req,res)=>{
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID:shortId
    },{
        $push:{clickHistory : {
            timestamp:Date.now(),
        },},
    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{
    console.log(`Server Started At PORT:${PORT}`);
})