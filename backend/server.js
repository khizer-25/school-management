require("dotenv").config();
const cors = require('cors');


const mongoose = require('mongoose');
const express=require('express');

const app = express()
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/school_management")
 .then(()=>console.log("MongoDB Connected"))
 .catch(err=>console.error("MongoDB Connection Failed"))
app.use("/", require("./routes/routes"));
app.listen(5000,()=>console.log("Server is running")) 