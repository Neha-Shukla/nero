const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    channel = await connection.createChannel();
    await channel.assertQueue("paymentQueue");
    await channel.assertQueue("transactionQueue");

    console.log("Connected to RabbitMQ");
  } catch (err) {
    console.error("RabbitMQ Connection Error:", err.message);
  }
};

const getRabbitMQChannel = () => channel;

module.exports = { connectRabbitMQ, getRabbitMQChannel };
