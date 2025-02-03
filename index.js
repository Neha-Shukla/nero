const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

app.use("/users", (req, res) => proxy.web(req, res, { target: "http://user-service:3001" }));
app.use("/orders", (req, res) => proxy.web(req, res, { target: "http://order-service:3002" }));
app.use("/payments", (req, res) => proxy.web(req, res, { target: "http://payment-service:3003" }));

app.listen(3000, () => console.log("API Gateway running on port 3000"));
