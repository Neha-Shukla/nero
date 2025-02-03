const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.use(
  "/",
  authenticate,
  createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
