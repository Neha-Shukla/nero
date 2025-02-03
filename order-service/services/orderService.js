const Order = require("../models/Order");
const { publishToQueue } = require("../config/rabbitmq");

const createOrder = async (userId, items, amount) => {
  const order = new Order({ userId, items, amount });
  await order.save();

  // ✅ Send order details to Payment Service
  publishToQueue("orderQueue", { orderId: order._id, amount });

  return order;
};

const getUserOrders = async (userId) => {
  return await Order.find({ userId });
};

const getOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

module.exports = { createOrder, getUserOrders, getOrderById };
