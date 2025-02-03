const express = require("express");
const connectDB = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const paymentRoutes = require("./routes/paymentRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/payments", paymentRoutes);

connectDB();
connectRabbitMQ();

module.exports = app;
