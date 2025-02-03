const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
