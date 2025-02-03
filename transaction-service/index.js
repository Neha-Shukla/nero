const express = require("express");
const mongoose = require("mongoose");
const amqp = require("amqplib");
const Transaction = require("./models/Transaction");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let channel;
async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();
  await channel.assertQueue("transactionQueue");

  channel.consume("transactionQueue", async (msg) => {
    const { paymentId, status } = JSON.parse(msg.content.toString());
    
    if (status === "completed") {
      await Transaction.findOneAndUpdate({ paymentId }, { status: "completed" });
    }
  });
}

app.listen(3004, async () => {
  console.log("Transaction Service running on port 3004");
  await connectRabbitMQ();
});
