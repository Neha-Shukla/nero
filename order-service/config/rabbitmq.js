const amqp = require("amqplib");
require("dotenv").config();

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("orderQueue");
    console.log("✅ Connected to RabbitMQ");
  } catch (error) {
    console.error("❌ RabbitMQ Connection Error:", error);
  }
};

const publishToQueue = (queue, message) => {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
};

module.exports = { connectRabbitMQ, publishToQueue };
