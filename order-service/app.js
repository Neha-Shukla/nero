const express = require("express");
const cors = require("cors");
const { connectRabbitMQ } = require("./config/rabbitmq");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();
require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);

connectRabbitMQ();

module.exports = app;
