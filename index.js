const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const URL = require("./models/url")
const staticRoute = require("./routes/staticRouter");
const {connectMongoDB} = require("./connect");

const URLRoute = require("./routes/url");
connectMongoDB("mongodb://localhost:27017/short-url").then(()=>{
    console.log("Connection Established With MongoDB")
})

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req,res)=>{
//     const allUrls = await URL.find({});
//     res.render('home',{
//         urls:allUrls
//     });
// });


// Middleware so that the body is parsed in PostMan
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Routers
app.use("/url",URLRoute);
app.use("/",staticRoute);


app.get("/url/:shortID", async(req,res)=>{
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