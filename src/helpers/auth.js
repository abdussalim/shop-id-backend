const jwt = require("jsonwebtoken");

const authenticationsHelper = {
  generateNewToken: (payloads) => {
    const verifyJWTOptions = { expiresIn: "7d" };
    const token = jwt.sign(
      payloads,
      process.env.JWT_SECRET_HASH_KEY,
      verifyJWTOptions
    );
    return token;
  },
  generateRefreshToken: (payloads) => {
    const verifyJWTOptions = { expiresIn: "30d" };
    const token = jwt.sign(
      payloads,
      process.env.JWT_SECRET_HASH_KEY,
      verifyJWTOptions
    );
    return token;
  },
};

module.exports = authenticationsHelper;
