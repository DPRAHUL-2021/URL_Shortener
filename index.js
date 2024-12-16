const express = require("express");
const app = express();
const PORT = 8001;

const URLRoute = require("./routes/url");

app.use("/url",URLRoute);

app.listen(PORT,()=>{
    console.log(`Server Started At PORT:${PORT}`);
})