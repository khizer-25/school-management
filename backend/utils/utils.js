const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Standardized response object generator
const responseObjGenerator = (success, message, data) => {
  let resObj = {};
  resObj.success = success;
  resObj.message = message || (success ? "Successful!" : "Failed!");
  if (data) {
    resObj.data = data;
  }
  return resObj;
};

// Password hashing function
const hashPassword = (plainPass) => {
  return bcrypt.hash(plainPass, 10);  // Adjust the salt rounds as needed (e.g., 10 rounds)
};

// Password comparison function
const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// Token generation function (JWT)
const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
};

module.exports = { responseObjGenerator, hashPassword, comparePassword, generateToken };
