const { registerUser, verifyEmail, loginUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const result = await registerUser(name, email, password,phone);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const result = await verifyEmail(req.query.token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { register, verifyEmailController, login };
