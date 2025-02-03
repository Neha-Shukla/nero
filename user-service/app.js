const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", (req,res)=>{
    res.send("Hello")
});
app.use("/auth", authRoutes);

connectDB();

module.exports = app;
