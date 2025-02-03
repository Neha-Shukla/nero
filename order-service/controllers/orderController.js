const { createOrder, getUserOrders, getOrderById } = require("../services/orderService");

const createNewOrder = async (req, res) => {
  try {
    const { items, amount } = req.body;
    const order = await createOrder(req.user.userId, items, amount);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await getUserOrders(req.user.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = { createNewOrder, getOrders, getOrder };
