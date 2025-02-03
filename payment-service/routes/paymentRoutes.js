const express = require("express");
const { processOrderPayment, webhookHandler } = require("../controllers/paymentController");

const router = express.Router();

router.post("/", processOrderPayment);
router.post("/webhook", webhookHandler);

module.exports = router;
