const { createPayment, handleWebhook } = require("../services/paymentService");

const processOrderPayment = async (req, res) => {
  const { orderId, amount } = req.body;

  if (!orderId || !amount) {
    return res.status(400).json({ msg: "Order ID and amount are required" });
  }

  try {
    const payment = await createPayment(orderId, amount);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ msg: "Failed to process payment" });
  }
};

const webhookHandler = async (req, res) => {
  try {
    await handleWebhook(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "Webhook processing failed" });
  }
};

module.exports = { processOrderPayment, webhookHandler };
