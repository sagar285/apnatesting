const express = require("express");
const app = express();
const path = require("path");
var cors = require('cors')
require("dotenv").config()
const errorMiddleware = require("./src/middleware/error.js");
app.use(cors())

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./src/config/config.env" });
} 

app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb'}));
// Route Imports
const partnerRoute = require("./src/routes/partnerRoute");
const surveyRoute = require("./src/routes/surveyRoute.js");
const adminRoute = require("./src/routes/adminRoute.js");
const clientRoute= require("./src/routes/client.routes.js")
const IoRoute= require("./src/routes/io.routes.js")
 
app.use("/api/v1", partnerRoute);
app.use("/api/v1", surveyRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", clientRoute);
app.use("/api/v1", IoRoute);

app.use(express.static(path.join(__dirname, "../client/out")));

app.get('*',(req,res)=>{
  res.status(200).json({
    message:"Test"
  })
})

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;