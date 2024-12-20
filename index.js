const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const URL = require("./models/url")
const cookieParser = require("cookie-parser");
const {checkingUserLoggedInOrNot,checkAuth} = require('./middlewares/auth');

const URLRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const {connectMongoDB} = require("./connect");
connectMongoDB("mongodb://localhost:27017/short-url").then(()=>{
    console.log("Connection Established With MongoDB")
})

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));


// Middleware so that the body is parsed in PostMan
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Routers
app.use("/url",checkingUserLoggedInOrNot,URLRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);


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