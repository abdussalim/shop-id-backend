const jwt = require("jsonwebtoken");

const authenticationsHelper = {
  generateNewToken : (payloads)=>{
                                  const verifyJWTOptions = { expiresIn: "30s" };
                                  const token = jwt.sign(payloads, process.env.JWT_SECRET_HASH_KEY, verifyJWTOptions);
                                  return token;                      
  },
  generateRefreshToken : (payloads)=>{
                                      const verifyJWTOptions = { expiresIn: "1 day" };
                                      const token = jwt.sign(payloads, process.env.JWT_SECRET_HASH_KEY, verifyJWTOptions);
                                      return token;
  }
};

module.exports = authenticationsHelper;