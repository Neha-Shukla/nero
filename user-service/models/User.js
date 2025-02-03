const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false }, // ✅ Email verification
  emailToken: { type: String },  // ✅ Email verification token
  phone: { type: String, required: true, unique: true },
  phoneVerified: { type: Boolean, default: false }, // ✅ Phone verification
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
