const otpGenerator = require("otp-generator");
const sendOTP = require("../config/twilio");

const generateOTP = () => {
  return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
};

const sendOtpToPhone = async (phone) => {
  const otp = generateOTP();
  await sendOTP(phone, otp);
  return otp;
};

module.exports = sendOtpToPhone;
