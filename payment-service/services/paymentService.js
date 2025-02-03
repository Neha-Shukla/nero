const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const { getRabbitMQChannel } = require("../config/rabbitmq");

const createPayment = async (orderId, amount) => {
  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: orderId,
    });

    const payment = new Payment({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      status: "pending",
    });

    await payment.save();

    const channel = getRabbitMQChannel();
    if (channel) {
      channel.sendToQueue("paymentQueue", Buffer.from(JSON.stringify({ paymentId: payment._id, status: "pending" })));
    }

    return payment;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error("Payment creation failed");
  }
};

const handleWebhook = async (event) => {
  try {
    if (event.event === "payment.captured") {
      const payment = await Payment.findOneAndUpdate(
        { razorpayOrderId: event.payload.payment.entity.order_id },
        { status: "success" }
      );

      const channel = getRabbitMQChannel();
      if (channel) {
        channel.sendToQueue(
          "transactionQueue",
          Buffer.from(JSON.stringify({ paymentId: payment.orderId, status: "completed" }))
        );
      }
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
  }
};

module.exports = { createPayment, handleWebhook };
